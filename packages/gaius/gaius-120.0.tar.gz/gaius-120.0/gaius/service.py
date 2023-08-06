# -*- coding: utf-8 -*-
"""
Interface to the Crassus Lambda function. This module notifies Crassus
about updates to a CFN stack so Crassus will trigger the update process.
"""

import json
import logging
from datetime import datetime
from dateutil import tz, parser as date_parser
from time import sleep

import boto3

logger = logging.getLogger('gaius')

FINAL_STATES = [
    'CREATE_COMPLETE',
    'ROLLBACK_COMPLETE',
    'DELETE_COMPLETE',
    'UPDATE_COMPLETE',
    'UPDATE_ROLLBACK_COMPLETE'
]

ERROR_STATES = [
    'CREATE_FAILED',
    'ROLLBACK_FAILED',
    'DELETE_FAILED',
    'UPDATE_ROLLBACK_FAILED'
]


def parse_parameters(parameters):
    """ Parse input parameters from the command line """
    parameter_list = [x for x in parameters.split(',')]
    return dict([y.split('=') for y in parameter_list])


def generate_message(stack_name, parameters, region, version=1):
    """ Generate the update notification message """
    message = {}
    message['version'] = version
    message['stackName'] = stack_name
    message['region'] = region
    message['parameters'] = parse_parameters(parameters)
    return message


def notify(stack_name, parameters, topic_arn, region):
    """ Sends an update notification to Crassus """
    message = generate_message(stack_name, parameters, region)
    sns_client = boto3.client('sns', region_name=region)
    json_answer = sns_client.publish(
        TopicArn=topic_arn,
        Message=json.dumps(message),
    )
    logger.debug(json_answer)


def is_related_message(message_dict, stack_name):
    """Checks if StackName belongs to client-session or is  missing"""
    if message_dict.get('stackName') == stack_name:
        return True
    elif message_dict.get('stackName') is None:
        return True
    return False


def cleanup(back_channel_url, timeout,  stack_name, region):
    """Cleans up old messages on the deployment pipeline"""
    sqs_resource = boto3.resource('sqs', region_name=region)
    queue = sqs_resource.Queue(url=back_channel_url)

    while timeout > 0:
        messages = queue.receive_messages(MaxNumberOfMessages=10)
        messages = filter_stack_related_messages(messages, stack_name)
        if not messages:
            break
        else:
            for message in messages:
                cleanup_old_messages(message, stack_name)
                timeout -= 1


def filter_stack_related_messages(messages, stack_name):
    return filter(lambda msg:
        json.loads(msg.body).get('stackName') == stack_name,
        messages)


def cleanup_old_messages(message, stack_name):
    now = datetime.now(tz=tz.tzutc())
    message_dict = json.loads(message.body)
    message_stack_name = message_dict['stackName']
    message_timestamp = message_dict['timestamp']
    message_datetime = date_parser.parse(message_timestamp)
    logger.info(('[CLEANUP] message_datetime: %s, message_timestamp: %s, '
                 'message_stack_name: %s, stackname: %s'),
                message_datetime, now, message_stack_name, stack_name)
    if (message_stack_name == stack_name and
            message_datetime < now):
        logger.info('delete message "%s"', message_dict)
        message.delete()
        return True


def receive(back_channel_url, timeout,  stack_name, region,
            poll_interval=2):
    """Reads out the back-channel on the deployment pipeline"""
    timeout_orig = timeout
    sqs_resource = boto3.resource('sqs', region_name=region)
    queue = sqs_resource.Queue(url=back_channel_url)
    while timeout > 0:
        messages = queue.receive_messages(MaxNumberOfMessages=1)
        for message in messages:
            if process_message(message, stack_name):
                return
        timeout -= poll_interval
        sleep(poll_interval)
    logger.info('No final CFN message was received after % s seconds',
                timeout_orig)


def process_message(message, stack_name):
    message_dict = json.loads(message.body)
    message_stack_name = message_dict.get('stackName')
    message_status = message_dict.get('status')
    message_payload = message_dict.get('message')
    message_rtype = message_dict.get('resourceType')

    logger.debug(message_dict)
    logger.info('{0}: {1}: {2}: {3}'.format(message_stack_name,
                                            message_status,
                                            message_rtype,
                                            message_payload))
    if not is_related_message(message_dict, stack_name):
        message.change_visibility(VisibilityTimeout=0)
    else:
        message.delete()
        if message_status == 'failure':
            raise DeploymentErrorException(
                'Crassus failed with "{0}"'.format(message_payload))
        elif (message_rtype ==
              'AWS::CloudFormation::Stack' and message_status in ERROR_STATES):
            raise DeploymentErrorException(
                'Crassus failed with "{0}"'.format(message_payload))
        elif (message_rtype ==
              'AWS::CloudFormation::Stack' and message_status in FINAL_STATES):
            logger.info('Final CFN message received')
            return True


class DeploymentErrorException(Exception):

    def __init__(self, message):
        self.message = message

    def __str__(self):
        return self.message
