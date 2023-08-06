#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Deployment script that will deploy Postgres schemas to a given DB
Copyright (c) Affinitas GmbH

Usage:
  pgpm deploy (<connection_string> [-o | --owner <owner_role>] | set <environment_name> <product_name> (-o <owner_role>| --owner <owner_role>) ) [-m | --mode <mode>]
                [-u | --user <user_role>...]
                [-f <file_name>...] [--add-config <config_file_path>] [--debug-mode]
                [--vcs-ref <vcs_reference>] [--vcs-link <vcs_link>]
                [--issue-ref <issue_reference>] [--issue-link <issue_link>] [--compare-table-scripts-as-int]
                [--log-file <log_file_name>] [--global-config <global_config_file_path>]
  pgpm remove <connection_string> --pkg-name <schema_name> <v_major> <v_minor> <v_patch> <v_pre> [--old-rev <old_rev>]
                [--log-file <log_file_name>]
  pgpm install (<connection_string> | set <environment_name> <product_name> (-o <owner_role>| --owner <owner_role>) ) [--update | --upgrade] [--debug-mode]
                [-u | --user <user_role>...] [--log-file <log_file_name>] [--global-config <global_config_file_path>]
  pgpm uninstall <connection_string>
  pgpm list set <environment_name> <product_name>
                [--log-file <log_file_name>] [--global-config <global_config_file_path>]
  pgpm -h | --help
  pgpm -v | --version

Arguments:
  <connection_string>       Connection string to postgres database.
                            Can be in any format psycopg2 would understand it
  <environment_name>        Name of an environment to be used to get connection strings from global-config file
  <product_name>            Name of a product. E.g. ed_live

Options:
  -h --help                 Show this screen.
  -v --version              Show version.
  -f <file_name>..., --file <file_name>...
                            Use it if you want to deploy only specific files (functions, types, etc).
                            In that case these files if exist will be overridden.
                            Should be followed by the list of names of files to deploy.
  -o <owner_role>, --owner <owner_role>
                            Role to which schema owner and all objects inside will be changed. User connecting to DB
                            needs to be a superuser. If omitted, user running the script
                            will be the owner of schema and all objects inside
                            If --mode flag is *overwrite* or --file flag is used then this is ignored
                            as no new schema is created
                            During installation a mandatory parameter to install on behalf of the specified user
  -u <user_role>..., --user <user_role>...
                            Roles to which different usage privileges will be applied.
                            If omitted, default behaviour of DB applies
                            In case used with install command the following will be applied:
                            GRANT SELECT, INSERT, UPDATE, DELETE on all current and future tables
                            GRANT EXECUTE on all future and current functions
                            GRANT USAGE, SELECT on all current and future sequences
                            In case used with deploy command the following will be applied:
                            GRANT USAGE on the schema
                            GRANT EXECUTE on all current functions
  -m <mode>, --mode <mode>  Deployment mode. Can be:
                            * safe. Add constraints to deployment. Will not deploy schema
                            if it already exists in the DB
                            * moderate. If schema exists, will try to rename it by adding suffix "_"
                            and deploy new schema with old name
                            * unsafe. allows cascade deleting of schema if it exists and adding new one
                            * overwrite. Will run scripts overwriting existing ones.
                            User have to make sure that overwriting is possible.
                            E.g. if type exists, rewriting should be preceeded with dropping it first manually
                            [default: safe]
  --add-config <config_file_path>
                            Provides path to additional config file. Attributes of this file overwrite config.json
  --debug-mode              Debug level loggin enabled if command is present. Otherwise Info level
  --update                  Update pgpm to a newer version
  --upgrade                  Update pgpm to a newer version
  --vcs-ref <vcs_reference> Adds vcs reference to deployments log table
  --vcs-link <vcs_link>     Adds link to repository to deployments log table
  --issue-ref <issue_reference>
                            Adds issue reference to deployments log table
  --issue-link <issue_link> Adds link to issue tracking system to deployments log table
  --pkg-name <schema_name>  Package name to be removed
  --old-rev <old_rev>       If omitted all old revisions are deleted together with current revision.
                            If specified just the specified revision is deleted
  --compare-table-scripts-as-int
                            Flag says that when table scripts are running they should be ordered
                            but first their names are to be converted to int.
                            By default scripts are ordered by string comparison
  --log-file <log_file_name>
                            Log into a specified file. If not specified, logs are ignored
  --global-config <global_config_file_path>
                            path to a global-config file. If global gonfig exists also in ~/.pgpmconfig file then
                            two dicts are merged (file formats are JSON).


"""
import logging
import os
from pprint import pprint

import pgpm.lib.install
import pgpm.lib.deploy
import sys
import time
import colorama
import pgpm.utils.config

from docopt import docopt

from pgpm import settings


# getting logging
logger = logging.getLogger(__name__)


def main():
    arguments = docopt(__doc__, version=settings.__version__)
    colorama.init()

    # setting logging
    formatter = logging.Formatter(settings.LOGGING_FORMATTER)
    if arguments['--debug-mode']:
        logger_level = logging.DEBUG
    else:
        logger_level = logging.INFO
    logger.setLevel(logger_level)
    if arguments['--log-file']:
        handler = logging.FileHandler(arguments['--log-file'])
        handler.setLevel(logger_level)
        handler.setFormatter(formatter)
        logger.addHandler(handler)

    sys.stdout.write('\033[2J\033[0;0H')
    if arguments['install']:
        if arguments['set']:
            if arguments['<environment_name>'] and arguments['<product_name>']:
                if arguments['--global-config']:
                    extra_config_file = arguments['--global-config']
                else:
                    extra_config_file = None
                global_config = pgpm.utils.config.GlobalConfiguration(None, extra_config_file)
                for connection_dict in global_config.get_list_connections(arguments['<environment_name>'], arguments['<product_name>']):
                    connection_string = 'host=' + connection_dict['host'] + ' port=' + str(connection_dict['port']) + \
                                        ' dbname=' + connection_dict['dbname'] + ' user=' + arguments['--owner'][0]
                    _install_schema(connection_string, arguments['--user'], arguments['--upgrade'])
            else:
                logger.error('set command can be used only with environment_name argument')
                sys.exit(1)
        else:
            _install_schema(arguments['<connection_string>'], arguments['--user'], arguments['--upgrade'])
    elif arguments['deploy']:
        if arguments['set']:
            if arguments['<environment_name>'] and arguments['<product_name>']:
                if arguments['--global-config']:
                    extra_config_file = arguments['--global-config']
                else:
                    extra_config_file = None
                global_config = pgpm.utils.config.GlobalConfiguration(None, extra_config_file)
                for connection_dict in global_config.get_list_connections(arguments['<environment_name>'], arguments['<product_name>']):
                    connection_string = 'host=' + connection_dict['host'] + ' port=' + str(connection_dict['port']) + \
                                        ' dbname=' + connection_dict['dbname'] + ' user=' + arguments['--owner'][0]
                    _deploy_schema(connection_string,
                                   mode=arguments['--mode'][0], files_deployment=arguments['--file'],
                                   vcs_ref=arguments['--vcs-ref'], vcs_link=arguments['--vcs-link'],
                                   issue_ref=arguments['--issue-ref'], issue_link=arguments['--issue-link'],
                                   compare_table_scripts_as_int=arguments['--compare-table-scripts-as-int'])

            else:
                logger.error('set command can be used only with environment_name argument')
                sys.exit(1)
        else:
            _deploy_schema(arguments['<connection_string>'],
                           mode=arguments['--mode'][0], files_deployment=arguments['--file'],
                           vcs_ref=arguments['--vcs-ref'], vcs_link=arguments['--vcs-link'],
                           issue_ref=arguments['--issue-ref'], issue_link=arguments['--issue-link'],
                           compare_table_scripts_as_int=arguments['--compare-table-scripts-as-int'])

    elif arguments['list']:
        if arguments['set']:
            if arguments['<environment_name>'] and arguments['<product_name>']:
                if arguments['--global-config']:
                    extra_config_file = arguments['--global-config']
                else:
                    extra_config_file = None
                global_config = pgpm.utils.config.GlobalConfiguration(None, extra_config_file)
                pprint(global_config.get_list_connections(arguments['<environment_name>'], arguments['<product_name>']))

            else:
                logger.error('set command can be used only with environment_name argument')
                sys.exit(1)
    else:
        print(arguments)


def _install_schema(connection_string, user, upgrade):
    logger.info('Installing... {0}'.format(connection_string))
    sys.stdout.write(colorama.Fore.YELLOW + 'Installing...' + colorama.Fore.RESET +
                     ' | ' + connection_string)
    sys.stdout.flush()
    installation_manager = pgpm.lib.install.InstallationManager(connection_string, '_pgpm', 'basic',
                                                                logger)
    try:
        installation_manager.install_pgpm_to_db(user, upgrade)
    except:
        print('\n')
        print('Something went wrong, check the logs. Aborting')
        print(sys.exc_info()[0])
        print(sys.exc_info()[1])
        print(sys.exc_info()[2])
        raise

    sys.stdout.write('\033[2K\r' + colorama.Fore.GREEN + 'Installed' + colorama.Fore.RESET +
                     ' | ' + connection_string)
    sys.stdout.write('\n')
    logger.info('Successfully installed {0}'.format(connection_string))
    return 0


def _deploy_schema(connection_string, mode, files_deployment, vcs_ref, vcs_link, issue_ref, issue_link, compare_table_scripts_as_int):
    deploying = 'Deploying...'
    deployed = 'Deployed    '
    logger.info('Deploying... {0}'.format(connection_string))
    sys.stdout.write(colorama.Fore.YELLOW + deploying + colorama.Fore.RESET +
                     ' | ' + connection_string)
    sys.stdout.flush()

    deployment_manager = pgpm.lib.deploy.DeploymentManager(
        connection_string, os.path.abspath('.'), os.path.abspath(settings.CONFIG_FILE_NAME),
        pgpm_schema_name='_pgpm', logger=logger)
    try:
        deployment_manager.deploy_schema_to_db(mode=mode, files_deployment=files_deployment,
                                               vcs_ref=vcs_ref, vcs_link=vcs_link,
                                               issue_ref=issue_ref, issue_link=issue_link,
                                               compare_table_scripts_as_int=compare_table_scripts_as_int)
    except:
        print('\n')
        print('Something went wrong, check the logs. Aborting')
        print(sys.exc_info()[0])
        print(sys.exc_info()[1])
        print(sys.exc_info()[2])
        raise

    sys.stdout.write('\033[2K\r' + colorama.Fore.GREEN + deployed + colorama.Fore.RESET +
                     ' | ' + connection_string)
    sys.stdout.write('\n')
    logger.info('Successfully deployed {0}'.format(connection_string))
    return 0


if __name__ == '__main__':
    main()
