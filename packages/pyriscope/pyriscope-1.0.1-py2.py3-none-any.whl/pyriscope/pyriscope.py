__author__ = 'Russell Harkanson'

import sys
import re
import json
import requests
from datetime import datetime

# Contants.
PERISCOPE_GETBROADCAST = "https://api.periscope.tv/api/v2/getBroadcastPublic?{}={}"
PERISCOPE_GETACCESS = "https://api.periscope.tv/api/v2/getAccessPublic?{}={}"
ARGLIST_HELP = ('', '-h', '--h', '-help', '--help', 'h', 'help', '?', '-?', '--?')
ARGLIST_CONVERT = ('-c', '--convert')
ARGLIST_ROTATE = ('-r', '--rotate')
ARGLIST_AGENTMOCK = ('-a', '--agent')
ARGLIST_NAME = ('-n', '--name')


def show_help():
    print("""
version 1.0.1

Usage:
    pyriscope <url> [options]

url accepted forms:
    https://www.periscope.tv/w/1LyxBeXmWObJN
    https://www.periscope.tv/w/aM1wNjE1ODAxMHwxcm14UGF2UkxOREtOGeN8ChyFlAXW4ihB_3NA9h3UysetWhz5G8WQdi7dsro=
    https://www.periscope.tv/Flad_Land/1zqJVmdaBvXGB
    http://www.perisearch.net/w/aM7_kzIzMjk1NTJ8MU1ZR05iWkFhUnZHd2_M8lSATtJLmbT0wvem7Ml6TTJgRS4_ReuSeQNGN73z

options:
    -h, --help              Show help. (This)
    -c, --convert           Convert download (.ts) to mp4.
    -r, --rotate            If convert, rotate converted video.
    -a, --agent             Turn off user agent mocking. (Slightly quicker initial startup)
    -n, --name <file>       Name the file.

About:
    Pyriscope is influenced by n3tman/periscope.tv, a Windows batch script also for downloading Periscope videos.

    Pyriscope is open source, with a public repo on Github.
        https://github.com/rharkanson/pyriscope

    """)
    sys.exit(0)


def dissect_url(url):
    url_pattern = re.compile(r'(http:\/\/|https:\/\/|)(www.|)(periscope.tv|perisearch.net)\/(w|\S+)\/(\S+)')
    match = re.search(url_pattern, url)

    parts = {}

    try:
        parts['url'] = match.group(0)
        parts['website'] = match.group(3)
        parts['username'] = match.group(4)
        parts['token'] = match.group(5)

        if len(parts['token']) < 15:
            parts['broadcast_id'] = parts['token']
            parts['token'] = ""

    except:
        print("\nError: Invalid URL: {}".format(url))
        sys.exit(1)

    return parts


def get_mocked_user_agent():
    try:
        response = requests.get("http://api.useragent.io/")
        response = json.loads(response.text)
        return response['ua']
    except:
        try:
            response = requests.get("http://labs.wis.nu/ua/")
            response = json.loads(response.text)
            return response['ua']
        except:
            return "Mozilla\/5.0 (X11; U; Linux i686; de; rv:1.9.0.18) Gecko\/2010020400 SUSE\/3.0.18-0.1.1 Firefox\/3.0.18"


def main(args):
    # Make sure there are args, do a primary check for help.
    if len(args) == 0 or args[0] in ARGLIST_HELP:
        show_help()

    # Defaults arg flag settings.
    url_parts = {}
    convert = 0
    rotate = 0
    agent_mocking = True
    name = ""
    req_headers = {}

    # Read in args and set appropriate flags.
    cont = None
    for i in range(len(args)):
        if cont == ARGLIST_NAME:
            if args[i][0] in ('\'','\"'):
                if args[i][-1:] == args[i][0]:
                    cont = None
                    name = args[i][1:-1]
                else:
                    cont = args[i][0]
                    name = args[i][1:]
            else:
                cont = None
                name = args[i]
            continue
        if cont in ('\'','\"'):
            if args[i][-1:] == cont:
                cont = None
                name += " {}".format(args[i][:-1])
            else:
                name += " {}".format(args[i])
            continue

        if i == 0:
            url_parts = dissect_url(args[0])
        if args[i] in ARGLIST_HELP:
            show_help()
        if args[i] in ARGLIST_CONVERT:
            convert = 1
        if args[i] in ARGLIST_ROTATE:
            rotate = 1
        if args[i] in ARGLIST_AGENTMOCK:
            agent_mocking = False
        if args[i] in ARGLIST_NAME:
            cont = ARGLIST_NAME

    # Set a mocked user agent.
    if agent_mocking:
        sys.stdout.write("\rGetting mocked User-Agent.")
        sys.stdout.flush()
        req_headers['User-Agent'] = get_mocked_user_agent()

    # Public Periscope API call to get information about the broadcast.
    if url_parts['token'] == "":
        req_url = PERISCOPE_GETBROADCAST.format("broadcast_id", url_parts['broadcast_id'])
    else:
        req_url = PERISCOPE_GETBROADCAST.format("token", url_parts['token'])

    sys.stdout.write("\rDownloading broadcast information.")
    sys.stdout.flush()
    response = requests.get(req_url, headers=req_headers)
    broadcast_public = json.loads(response.text)

    if 'success' in broadcast_public and broadcast_public['success'] == False:
        print("\nError: Video expired/deleted/wasn't found.")
        sys.exit(1)

    # Loaded the correct JSON. Create file name.
    if name == "":
        broadcast_start_time = broadcast_public['broadcast']['start'].rfind('.')
        broadcast_start_time = broadcast_public['broadcast']['start'][:broadcast_start_time]
        broadcast_start_time = datetime.strptime(broadcast_start_time, '%Y-%m-%dT%H:%M:%S')
        broadcast_start_time = "{}-{}-{} {}-{}-{}".format(broadcast_start_time.year, broadcast_start_time.month,
                                                          broadcast_start_time.day, broadcast_start_time.hour,
                                                          broadcast_start_time.minute, broadcast_start_time.second)
        name = "{} ({})".format(broadcast_public['broadcast']['username'], broadcast_start_time)


    # Get ready to start capturing.
    if broadcast_public['broadcast']['state'] == 'RUNNING':
        # The stream is live, start live capture.
        print("")


    else:
        if not broadcast_public['broadcast']['available_for_replay']:
            print("\nError: Replay unavailable.")
            sys.exit(1)

        # Broadcast replay is available.
        if url_parts['token'] == "":
            req_url = PERISCOPE_GETACCESS.format("broadcast_id", url_parts['broadcast_id'])
        else:
            req_url = PERISCOPE_GETACCESS.format("token", url_parts['token'])

        sys.stdout.write("\rDownloading replay information.")
        sys.stdout.flush()
        response = requests.get(req_url, headers=req_headers)
        access_public = json.loads(response.text)

        if 'success' in access_public and access_public['success'] == False:
            print("\nError: Video expired/deleted/wasn't found.")
            sys.exit(1)

        base_url = access_public['replay_url'][:-14]

        req_headers['Cookie'] = "{}={};{}={};{}={}".format(access_public['cookies'][0]['Name'],
                                                           access_public['cookies'][0]['Value'],
                                                           access_public['cookies'][1]['Name'],
                                                           access_public['cookies'][1]['Value'],
                                                           access_public['cookies'][2]['Name'],
                                                           access_public['cookies'][2]['Value'])
        req_headers['Host'] = "replay.periscope.tv"

        # Get the list of chunks to download.
        sys.stdout.write("\rDownloading chunk list.")
        sys.stdout.flush()
        response = requests.get(access_public['replay_url'], headers=req_headers)
        chunks = response.text
        chunk_pattern = re.compile(r'chunk_\d+\.ts')

        download_list = []
        for chunk in re.findall(chunk_pattern, chunks):
            download_list.append("{}/{}".format(base_url, chunk))

        # Download chunk .ts files and appened them.
        cnt = 0
        with open("{}.ts".format(name), 'wb') as handle:
            for chunk_url in download_list:
                perc = int((cnt/len(download_list))*100)
                sys.stdout.write("\r[{:>3}%] Downloading replay.".format(perc))
                sys.stdout.flush()

                data = requests.get(chunk_url, stream=True, headers=req_headers)

                if not data.ok:
                    print("\nError: Unable to download chunk.")
                    sys.exit(1)
                for block in data.iter_content(4096):
                    handle.write(block)

                cnt += 1

        sys.stdout.write("\r{}.ts Downloaded!\n".format(name))
        sys.stdout.flush()
        sys.exit(0)

# Entry point.
if __name__ == "__main__":
    sys.argv.pop(0)
    if len(sys.argv) == 1 and sys.argv[0] == "__magic__":
        main(input("Enter args now: ").strip(' ').split(' '))
    else:
        main(sys.argv)
else:
    print("Must be the first module ran.")
    sys.exit(0)
