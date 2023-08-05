import glob
import signal
import os
import argparse
import shutil
import sys
import codecs
import zipfile

import psutil
import requests

from hgross.ac.ac_server import ACDedicatedServer, SERVER_WORKING_DIR_FILENAME_PREFIX, SERVER_PIDFILE_NAME, SERVER_PRESET_INDICATOR_NAME, DEDICATED_SERVER_BINARY_FILENAME
from hgross.ac.common import ACDedicatedServerConfig, ACServerWrapperConfig
from hgross.speedwise.speedwise_client import SpeedwiseClient

__author__ = 'Henning Gross'

def getPresets(wrapperConfig):
    "Returns a list of all subdirectories in the DEDICATED_SERVER_PRESETS_DIRECTORY directory - which are the presets available"
    l = [x[1] for x in os.walk(wrapperConfig.DEDICATED_SERVER_PRESETS_DIRECTORY) if x[0] == wrapperConfig.DEDICATED_SERVER_PRESETS_DIRECTORY]
    return [item for sublist in l for item in sublist] # flatten

def getPresetConfigByName(wrapperConfig, preset_name):
    "Returns the given preset's config object by it's name - returns None if not found"
    for preset in getPresets(wrapperConfig):
        if preset == preset_name:
            folder = wrapperConfig.DEDICATED_SERVER_PRESETS_DIRECTORY + os.path.sep + preset_name
            cfg = ACDedicatedServerConfig(folder)
            return cfg
    return None

def getStatusForServers(wrapperConfig):
    "Returns a list of tuples where the form of each tuple corresponds to (server_guid (String), isRunning (Bool), WorkingDirectoryPath (String), Preset name (String))"
    try:
        # append preset name
        def get_preset_name(working_dir):
            with open(working_dir + os.path.sep + SERVER_PRESET_INDICATOR_NAME, "r") as preset_name_file:
                preset_name = str(preset_name_file.read())
                preset_name_file.close()
            return preset_name
        def is_running(working_dir):
            "checks whether the server is running by it's PID file"
            guid = working_dir.replace(wrapperConfig.DEDICATED_SERVER_WORKSPACES_DIRECTORY + os.path.sep + SERVER_WORKING_DIR_FILENAME_PREFIX, "")
            pid_file_path = working_dir + os.path.sep + SERVER_PIDFILE_NAME
            if not os.path.exists(pid_file_path):
                return False
            with open(pid_file_path) as pid_file:
                pid = pid_file.read()
                pid_file.close()
            if not pid:
                os.unlink(pid_file_path) # remove pid file
                return False

            # check if is a process and actually running
            try:
                p = psutil.Process(int(pid))
                is_really_running = DEDICATED_SERVER_BINARY_FILENAME in p.exe() and guid in p.exe() and p.cwd() == working_dir
                if not is_really_running:
                    os.unlink(pid_file_path) # remove pid file
                return is_really_running
            except psutil.NoSuchProcess:
                os.unlink(pid_file_path) # remove pid file
                return False


        servers = [(working_dir.replace(wrapperConfig.DEDICATED_SERVER_WORKSPACES_DIRECTORY + os.path.sep + SERVER_WORKING_DIR_FILENAME_PREFIX, ""), is_running(working_dir), working_dir, get_preset_name(working_dir)) for working_dir in glob.glob(wrapperConfig.DEDICATED_SERVER_WORKSPACES_DIRECTORY + os.path.sep + SERVER_WORKING_DIR_FILENAME_PREFIX + "*")]
        return servers
    except Exception as e:
        print e
        return []

def clean_workspace(wrapperConfig):
    "Removes all working directories of servers that are not running"
    statuses = getStatusForServers(wrapperConfig)
    print ("Removing all working directories of not running servers ...")
    for guid, running, workingDirPath, preset in statuses:
        if not running:
            print ("Removing working directory for server %s (%s)" % (guid, workingDirPath))
            shutil.rmtree(workingDirPath)
        else:
            print ("Server %s (%s) is running - not touching working directory." % (guid, workingDirPath))
    print ("Done.")

def stop_server(wrapperConfig, server_guid):
    "Stops the server with the specified guid - if running. Returns True if a sigterm was sent to the server process"
    status_list = getStatusForServers(wrapperConfig)
    server = None
    for server_tuple in status_list:
        guid = server_tuple[0]
        is_running = server_tuple[2]
        if guid == server_guid:
            server = server_tuple
            if not is_running:
                return True # not running - nothing to do

    if not server:
        print (u"No server with guid %s was found." % server_guid)
        return False
    working_dir = server[2]
    pid = None
    with open(working_dir + os.path.sep + SERVER_PIDFILE_NAME, "r") as pid_file:
        pid = pid_file.read()
        pid_file.close()
    if not pid:
        print (u"ERROR: could not get pid from pid file")
        return False
    # TODO: ensure pid is running - if not remove pidfile
    # kill pid
    print (u"Stopping server %s (PID: %s)" % (server_guid, pid))
    os.kill(int(pid), signal.SIGTERM)
    return True

def stop_all_servers(wrapperConfig):
    print (u"Stopping all servers ...")
    for guid, is_running, _, _  in getStatusForServers(wrapperConfig):
        if not is_running:
            continue
        result = stop_server(wrapperConfig, guid)
        print (u"Server %s %s" % (guid, ("stopped" if result else "not stopped")))

def updateBlacklist(wrapperConfig):
    "Retrieves the blacklist from the server and write it to the ACServer base directory. True if successful, False otherwise"
    print (u"Updating blacklist ...")
    merge_file = None
    if wrapperConfig.merge_blacklist and os.path.isfile(wrapperConfig.merge_blacklist):
        merge_file = wrapperConfig.merge_blacklist

    client = SpeedwiseClient(wrapperConfig.speedwise_server_hostname, wrapperConfig.speedwise_server_port, wrapperConfig.speedwise_server_id, wrapperConfig.speedwise_server_secret)
    contents = client.retrieve_blacklist_txt(use_customized_blacklist=True)
    if contents:
        print (u"Received blacklist from speedwise.")
        with open(wrapperConfig.DEDICATED_SERVER_BASE_DIRECTORY + os.path.sep + "blacklist.txt", "w") as blacklist_file:
            blacklist_file.write(contents)
            print (u"Updated blacklist.txt of ac server base - %d entries." % len([x for x in contents.split("\n") if len(x) >= 17]))
            if merge_file:
                print (u"Merging contents of %s into received blacklist ..." % merge_file)
                with open(merge_file) as merge_fd:
                    i = 0
                    for line in merge_fd:
                        if i==0:
                            blacklist_file.write("\n")
                        blacklist_file.write(line)
                        i = i + 1
                    print (u"Merged %d entries into file" % i)
                    merge_fd.close()
            blacklist_file.close()

        # for each running instance: merge the new blacklist.txt file with the blacklist.txt of the instance
        content_set = set()
        for row in contents.split('\n'):
            row = row.strip('\r\n').strip('\n').strip("\r")
            if len(row) == 0:
                continue
            content_set.add(row)
        servers = getStatusForServers(wrapperConfig)
        print (u"Updating blacklist file of %d ac server instances ..." % len(servers))
        for server_guid, is_running, working_dir_path, preset_name in servers:
            instance_blacklist_file_path = working_dir_path + os.path.sep + "blacklist.txt"
            if not os.path.isfile(instance_blacklist_file_path):
                print (u"WARNING: There was no blacklist.txt file for instance %s! Skipping this instance." % server_guid)
                continue

            # open blacklist file (read)
            with open(instance_blacklist_file_path, "r") as instance_blacklist_file:
                for l in instance_blacklist_file.readlines():
                    l = l.strip('\r\n').strip('\n').strip("\r")
                    if len(l) > 0:
                        content_set.add(l)
                instance_blacklist_file.close()

            # open again in write mode to empty
            with open(instance_blacklist_file_path, "w") as instance_blacklist_file:
                instance_blacklist_file.write('\r\n'.join(content_set))
                instance_blacklist_file.close()
        print (u"... done.")
        return True

    else:
        print (u"Failed to retrieve blacklist. Check your internet connection.")
        return False

def unzip(source_filename, dest_dir):
    with zipfile.ZipFile(source_filename) as zf:
        for member in zf.infolist():
            # Path traversal defense copied from
            # http://hg.python.org/cpython/file/tip/Lib/http/server.py#l789
            words = member.filename.split('/')
            path = dest_dir
            for word in words[:-1]:
                drive, word = os.path.splitdrive(word)
                head, word = os.path.split(word)
                if word in (os.curdir, os.pardir, ''): continue
                path = os.path.join(path, word)
            zf.extract(member, path)


def _install_or_update_minorating(minorating_distribution_url, current_version, install_path):
    """
    Installs or updates the MinoRating distribution onto the given install_path.
    Note: the speedwise-client has corresponding functionality to retrieve the distribution url and the current_version.
    :param minorating_distribution_url: the URL to the latest MinoRating distribution (zip-file).
    :param current_version: the current MinoRating version number
    :param install_path: the install path, where MinoRating should be installed or upgraded
    :return: True on success
    """
    # ensure dirs
    mr_path = install_path
    if not os.path.exists(install_path):
        os.makedirs(install_path)

    # check if update is needed
    print ("Checking if MR needs to be updated ...")
    update_needed = True
    version_file_path = mr_path + os.path.sep + "MR-VERSION"
    if os.path.isfile(version_file_path):
        with open(version_file_path) as v_file:
            installed_version = v_file.read().replace("\n", '')
            v_file.close()
        if installed_version == current_version:
            update_needed = False
    elif os.path.isdir(version_file_path):
        print ("ERROR: The version file is a directory - what have you done??? Not updating.")
        return False
    else:
        # did not exist
        update_needed = True

    if not update_needed:
        print ("No MR update needed. Current version is %s" % installed_version)
        return True

    print ("Installed MR is not the current version. Updating ...")
    # we need to update

    # clear the directory's contents
    print ("Clearing folder %s ..." % mr_path)
    for the_file in os.listdir(mr_path):
        file_path = os.path.join(mr_path, the_file)
        try:
            if os.path.isfile(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception, e:
            print e

    # download the dist
    dist_download_path = mr_path + os.path.sep + "new_MR_dist.zip"
    if os.path.exists(dist_download_path):
        # error - path exists - try to delete
        os.remove(dist_download_path)

    # download
    print ("Downloading latest MR-distribution (%s) ..." % minorating_distribution_url)
    with open(dist_download_path, 'wb') as handle:
        response = requests.get(minorating_distribution_url, stream=True)
        if not response.ok:
            print ("Download of latest MinoRating distribution failed. Aborting. Not updating MR.")
            handle.close()
            os.remove(dist_download_path)
            return False
        for block in response.iter_content(1024):
            handle.write(block)
        handle.close()
        print ("Downloaded MR distribution (version %s)." % current_version)


    # install
    print ("Installing new MR distribution %s ..." % current_version)
    unzip(dist_download_path, mr_path)

    # write version file
    with open(version_file_path, "w") as v_file:
        v_file.write(current_version)
        v_file.close()

    # remove dist
    print ("Cleaning up ...")
    os.remove(dist_download_path)
    return True


class PresetDoesNotExist (BaseException): pass

def start_server_from_preset(preset_name, wrapperConfig):
    "Starts a server based on the preset name. Raises PresetDoesNotExist, if preset not found."
    print ("Starting instance of preset %s" % preset_name)
    updateBlacklist(wrapperConfig)
    presets = getPresets(wrapperConfig)
    if not preset_name in presets:
        raise PresetDoesNotExist()
    presetFolderPath = wrapperConfig.DEDICATED_SERVER_PRESETS_DIRECTORY + os.path.sep + preset_name
    serverConfig = ACDedicatedServerConfig(presetFolderPath)

    # init a MR update, if needed
    if serverConfig.is_minorating_activated():
        install_or_update_minorating(wrapperConfig)

    server = ACDedicatedServer(serverConfig, wrapperConfig)
    server.start_server()
    return server


def install_or_update_minorating(wrapperConfig):
    """
    Retrieves the MR metadata from the speedwise page and then updates the MR plugin based on that.
    :param wrapperConfig: the wrapper config
    """
    client = SpeedwiseClient(wrapperConfig.speedwise_server_hostname, wrapperConfig.speedwise_server_port, wrapperConfig.speedwise_server_id, wrapperConfig.speedwise_server_secret)

    data = client.retrieve_latest_minorating_version_info()
    if not data:
        print ("Error: Could not upgrade MinoRating. Failed to retrieve version info object.")
        return
    version = str(data["version"])
    download_url = data["download-url"]
    mr_path = wrapperConfig.DEDICATED_SERVER_BASE_DIRECTORY + os.path.sep + "MinoRating" + os.path.sep + "current"
    return _install_or_update_minorating(download_url, version, mr_path)

def main_func():
    "The main"
    sys.stdout = codecs.getwriter("utf8")(sys.stdout);
    COMMANDS = {"presets": "Lists all presets available for server creation",
                "start": "Starts a server with the given preset (--preset ...)",
                "stop": "Stops a server with the given guid (--guid...)",
                "stop_all": "Stops all running servers",
                "list": "Lists all servers in the working directory.",
                "clean": "Removes all working directories that are not used at the moment.",
                "update-blacklist": "Updates the blacklist.txt.",
                "config": "Shows the path of the config file",
                "update-minorating": "Installs or upgrades the MinoRating system (see minorating.com)"}

    argParser = argparse.ArgumentParser(formatter_class=argparse.RawTextHelpFormatter, description="Start a Assetto Corsa dedicated server instance", epilog="Descriptions for the command parameter options:\n\n%s" % ("\n".join(["%20s  %s" % t for t in COMMANDS.iteritems()])))
    argParser.add_argument("command", type=str, help="The command to execute", choices=COMMANDS.keys())
    argParser.add_argument("--preset", type=str, help="Folder name of the preset to use (creatable by the ACServerLauncher.exe)")
    argParser.add_argument("--guid", type=str, help="Server GUID (needed for the stop command)")
    argParser.add_argument('--config-file', default="speedwise.ini", help='This wrapper\'s config file path.')
    args = argParser.parse_args()
    command = args.command

    if not os.path.isfile(args.config_file):
        print (u"Error: Config file does not exist (%s).\nUse --config-file path/to/your/speedwise.ini to specify the correct path." % args.config_file)
        sys.exit(1)

    wrapperConfig = ACServerWrapperConfig(args.config_file)

    if command == "start":
        if not args.preset and len(getPresets(wrapperConfig)) == 0:
            raise BaseException("No preset specified")
        elif not args.preset and len(getPresets(wrapperConfig)) > 0:
            args.preset = getPresets(wrapperConfig)[0] # take first
            print ("WARNING: No preset defined with start command, defaulting to first (%s)" % args.preset)
        if not args.preset in getPresets(wrapperConfig):
            raise BaseException("This preset does not exist (%s). Available presets: %s" % (args.preset, "No presets available" if getPresets() == 0 else ", ".join(getPresets())))
        # finally create instance and start
        server = start_server_from_preset(args.preset, wrapperConfig)
    elif command == "presets":
        presets = getPresets(wrapperConfig)
        presetHeader = "Preset names"
        longestPresetLength = max(map(lambda x:len(x), presets + [presetHeader]))
        table_rows = [("%"+str(longestPresetLength)+"s | %s") % (preset, wrapperConfig.DEDICATED_SERVER_PRESETS_DIRECTORY + os.path.sep + preset) for preset in presets]
        if len(table_rows) == 0:
            print "### No presets found in folder %s" % wrapperConfig.DEDICATED_SERVER_PRESETS_DIRECTORY
        else:
            longestRowLength = max(map(lambda x : len(x), table_rows))
            print ("%"+str(longestPresetLength)+"s | %s") % (presetHeader, "Path\n") + ("-" * longestRowLength)
            print "\n".join(table_rows)
    elif command == "list":
        statuses = getStatusForServers(wrapperConfig)
        headerData = ("GUID", "Running", "WorkingDirectory", "preset")
        colLength = lambda collection: max(map(lambda x: len(str(x)), collection))
        column1length = colLength([x[0] for x in statuses + [headerData]])
        column2length = colLength([x[1] for x in statuses + [headerData]])
        column3length = colLength([x[2] for x in statuses + [headerData]])
        column4length = colLength([x[3] for x in statuses + [headerData]])

        #formatString = "%{0}s | %{1}s | %{2}".format(column1length, column2length, column3length) # not working? need to use the ugly style ...
        formatString = "%" + str(column1length) + "s | %" + str(column2length) + "s | %" + str(column3length) + "s | %" + str(column4length) + "s"
        header = formatString % headerData

        # Header, Line and Data
        print (header)
        print (len(header) * "-")
        print ("\n".join([formatString % tuple(map(lambda x: str(x), serverData)) for serverData in statuses]))

    elif command == "clean":
        clean_workspace(wrapperConfig)
    elif command == "update-blacklist":
        updateBlacklist(wrapperConfig)
    elif command == "config":
        abs_path = os.path.abspath(args.wrapper_config_file+"")
        print (str(abs_path))
    elif command == "stop":
        if not args.guid:
            raise BaseException(u"No guid given. Use --guid <youGuid> to stop a specific server. Find the guid with the 'list' command")
        guid = args.guid
        stop_server(wrapperConfig, guid)
    elif command == "stop_all":
        stop_all_servers(wrapperConfig)
    elif command == "update-minorating":
        install_or_update_minorating(wrapperConfig)


if __name__ == '__main__':
    main_func()