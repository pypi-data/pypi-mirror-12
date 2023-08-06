
# Import opinel
from opinel.utils import *


########################################
##### S3-related arguments
########################################

#
# Add an S3-related argument to a recipe
#
def add_s3_argument(parser, default_args, argument_name):
    if argument_name == 'bucket-name':
        parser.add_argument('--bucket-name',
                            dest='bucket_name',
                            default=[],
                            nargs='+',
                            help='Your AWS IAM user name; if not provided, this script will find it automatically if you have iam:getUser privileges')
    else:
        raise Exception('Invalid parameter name: %s' % argument_name)


########################################
##### Helpers
########################################

#
# Connect to S3
#
def connect_s3(key_id, secret, session_token, region_name = None, config = None, silent = False):
    return connect_service('S3', key_id, secret, session_token, region_name, config, silent)

#
# Get bucket location
#
def get_s3_bucket_location(s3_client, bucket_name):
    location = s3_client.get_bucket_location(Bucket = bucket_name)
    return location['LocationConstraint'] if location['LocationConstraint'] else 'us-east-1'


parser.add_argument('--buckets',
                    dest='buckets',
                    default=[],
                    nargs='+',
                    help='Name of buckets to iterate through when checking object properties')

