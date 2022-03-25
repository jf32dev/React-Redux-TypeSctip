#!/usr/bin/env python3

import json
import os
import subprocess
import sys

import boto3


def send_notification(build_result):
    payload = {
        'build_result': build_result,
        'author_email': subprocess.getoutput('git show -s --pretty=%ae'),
        'build_tag': os.environ.get('BUILD_TAG'),
        'run_display_url': os.environ.get('RUN_DISPLAY_URL'),
    }

    sns_client = boto3.client('sns', region_name=os.environ['AWS_REGION'])
    sns_client.publish(
        TopicArn=os.environ['SLACK_SNS_ARN'],
        Message=json.dumps(payload)
    )


if __name__ == '__main__':
    send_notification(
        build_result=sys.argv[1]
    )
