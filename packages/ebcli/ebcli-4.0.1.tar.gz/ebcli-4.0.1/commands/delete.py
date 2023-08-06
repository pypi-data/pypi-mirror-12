"""
ElasticBox Confidential
Copyright (c) 2014 All Right Reserved, ElasticBox Inc.

NOTICE:  All information contained herein is, and remains the property
of ElasticBox. The intellectual and technical concepts contained herein are
proprietary and may be covered by U.S. and Foreign Patents, patents in process,
and are protected by trade secret or copyright law. Dissemination of this
information or reproduction of this material is strictly forbidden unless prior
written permission is obtained from ElasticBox
"""

import commands


def initialize_parser(subparsers):
    parser = subparsers.add_parser('delete', help='Delete specified object')

    group = parser.add_mutually_exclusive_group(required=True)
    commands.add_standard_argument(group, commands.BOX_ID_ARG)
    commands.add_standard_argument(group, commands.INSTANCE_ID_ARG)
    commands.add_standard_argument(group, commands.WORKSPACE_ID_ARG)

    parser.set_defaults(func=execute_command)


def execute_command(args, _unknown):
    session = commands.AuthenticatedSession(args.url, args.token)

    if args.box_id:
        session.delete('/services/boxes/{0}', args.box_id)

    if args.instance_id:
        session.delete('/services/instances/{0}', args.instance_id)

    if args.workspace_id:
        session.delete('/services/workspaces/{0}', args.workspace_id)
