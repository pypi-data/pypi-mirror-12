import simplejson as json
import os
import sys
import zipfile
import shutil
import pyprind
import requests

KAPTL_HOST = "https://www.kaptl.com"
KAPTL_PARSE_URL = KAPTL_HOST + "/api/apps/parse"
KAPTL_DOWNLOAD_URL = KAPTL_HOST + "/api/apps/download"


def query_yes_no(question, default="yes"):
    """Ask a yes/no question via raw_input() and return their answer.

    "question" is a string that is presented to the user.
    "default" is the presumed answer if the user just hits <Enter>.
        It must be "yes" (the default), "no" or None (meaning
        an answer is required of the user).

    The "answer" return value is one of "yes" or "no".
    :param default:
    :param question:
    """
    valid = {"yes": "yes", "y": "yes", "ye": "yes",
             "no": "no", "n": "no"}
    if default is None:
        prompt = " [y/n] "
    elif default == "yes":
        prompt = " [Y/n] "
    elif default == "no":
        prompt = " [y/N] "
    else:
        raise ValueError("invalid default answer: '%s'" % default)

    while 1:
        sys.stdout.write(question + prompt)
        choice = raw_input().lower()
        if default is not None and choice == '':
            return default
        elif choice in valid.keys():
            return valid[choice]
        else:
            sys.stdout.write("Please respond with 'yes' or 'no' (or 'y' or 'n').\n")


session = requests.Session()


class NoStackInfoException(Exception):
    pass


class WrongStackInfoException(Exception):
    pass


class NoRulesInfoException(Exception):
    pass


class Kaptl:
    def __init__(self, arguments):
        self.angular_only = False
        self.frontend = []
        self.backend = []
        self.stack = []
        self.manifest = {}
        self.kaptl_cookie = None
        self.existing = False
        self.arguments = arguments

        # process arguments
        if self.arguments["edit"]:
            self.existing = True
            self.process_manifest()
            if self.manifest["appName"]:
                self.kaptl_cookie = {"kaptl-session-id": self.manifest["appName"]}

        try:
            self.process_stack_info()
        except NoStackInfoException, e:
            print e.message
            sys.exit()
        except WrongStackInfoException, e:
            print e.message
            sys.exit()

        if self.arguments["<rules>"]:
            self.rules = self.arguments["<rules>"]
        elif self.arguments["--rules-file"]:
            self.rules = self.read_rules_from_file(self.arguments["--rules-file"])  # read the data from file
        else:
            raise NoRulesInfoException("ERROR: Couldn't find rules")

    def execute_pipeline(self):
        """Run the pipeline of requests, get the file and unzip it"""

        app_name = self.parse_rules()
        if app_name is not None:
            file_info = self.get_file_info(app_name)
            if file_info is not None:
                self.download_file(file_info)
                self.unzip_archive(file_info[1], existing=self.existing)
            else:
                print "ERROR: Couldn't retrieve a file from the server. Try again later."
                sys.exit()
        else:
            sys.exit()

    def parse_rules(self):
        print "Parsing the rules..."
        request_data = dict(rulesText=self.rules.replace('\\', '').replace('\'', '"'), stack=self.stack)
        try:
            if self.kaptl_cookie is not None:
                response = session.post(KAPTL_PARSE_URL, json=request_data,
                                        cookies=self.kaptl_cookie)
            else:
                response = session.post(KAPTL_PARSE_URL, json=request_data)
            response_content = response.json()
            if response.status_code and response_content["success"]:
                print "Rules were parsed successfully"
                return response_content["appName"]
            else:
                print "ERROR: There was a problem with parsing the rules"
                if response_content["compilerOutput"]:
                    print response_content["compilerOutput"]
                return None
        except requests.exceptions.RequestException:
            print("ERROR: API is unavailable at the moment, please try again later")
            sys.exit()

    def get_file_info(self, app_name):
        print "Downloading the generated app..."
        request_data = dict(app={
            'id': 0,
            'name': app_name,
            'rules': self.rules,
            'stack': self.stack
        }, angularOnly=self.angular_only)

        try:
            response = session.post(KAPTL_DOWNLOAD_URL, json=request_data)
            response_content = response.json()
            if response.status_code and response_content["success"]:
                return response_content["fileUrl"], response_content["fileName"]
            else:
                return None
        except requests.exceptions.RequestException:
            print("ERROR: API is unavailable at the moment, please try again later.")
            sys.exit()

    @staticmethod
    def download_file(file_info):
        try:
            with open(file_info[1], 'wb') as f:
                r = session.get(file_info[0], stream=True)
                total_length = int(r.headers.get('content-length'))
                bar = pyprind.ProgBar(total_length / 1024)
                if total_length is None:  # no content length header
                    f.write(r.content)
                else:
                    for chunk in r.iter_content(1024):
                        f.write(chunk)
                        bar.update()
        except IOError:
            print "ERROR: Couldn't download a file"
            sys.exit()

    @staticmethod
    def unzip_archive(filename, existing):
        if not os.path.exists(filename[:-4]):
            os.makedirs(filename[:-4])
        try:
            with open(filename, "rb") as f:
                z = zipfile.ZipFile(f)
                if existing:
                    result = query_yes_no("This action may override changes you already made to your project."
                                          " Do you want to proceed?")
                    if result == "yes" or result == "y":
                        for name in z.namelist():
                            z.extract(name, os.getcwd())
                    elif result == "no" or result == "n":
                        print "Exiting the program..."
                    try:
                        if os.path.exists(filename[:-4]):
                            shutil.rmtree(filename[:-4], True)
                    except IOError:
                        print "ERROR: Couldn't delete the directory"
                else:
                    for name in z.namelist():
                        z.extract(name, filename[:-4])
            try:
                print "Cleaning up..."
                os.remove(filename)
            except IOError:
                print "ERROR: Couldn't delete a zip file"
        except IOError:
            print "ERROR: Couldn't unzip the file"

    @staticmethod
    def read_rules_from_file(path):
        try:
            with open(path, "rb") as rules_file:
                return rules_file.read()
        except IOError:
            print "ERROR: Couldn't read from a file"
            sys.exit()

    def process_manifest(self):
        try:
            with open("kaptl_manifest.json", "r") as manifest_file:
                self.manifest = json.loads(manifest_file.read(), 'utf-8')
        except IOError:
            print "ERROR: Couldn't parse a manifest file. " \
                  "Check if kaptl_manifest.json exists in the directory " \
                  "and is a valid JSON."

    def process_stack_info(self):
        if self.arguments["init"]:
            if self.arguments["--backend"] is None and self.arguments["--frontend"] is None:
                raise NoStackInfoException("ERROR: Please specify at least one of the stack parts")

            if self.arguments["--backend"] is not None:
                self.backend = [self.arguments["--backend"]]
                if self.backend != ["mvc"] and self.backend != ["sails"]:
                    raise WrongStackInfoException("ERROR: Backend framework is specified incorrectly")
            else:
                self.backend = []

            if self.arguments["--frontend"] is not None:
                self.frontend = [self.arguments["--frontend"]]
                if self.frontend != ["angular"]:
                    raise WrongStackInfoException("ERROR: Frontend framework is specified incorrectly")
            else:
                self.frontend = []

            self.stack = {"backend": self.backend, "frontend": self.frontend}

        if self.arguments["edit"]:
            self.stack = self.manifest["stack"]
            if self.stack["backend"] is None:
                self.stack["backend"] = []
            if self.stack["frontend"] is None:
                self.stack["frontend"] = []

        if not self.backend:
            if self.frontend == ["angular"]:
                self.angular_only = True
            elif self.stack["frontend"] == ["angular"] and self.stack["backend"] == []:
                self.angular_only = True
            else:
                self.angular_only = False
        else:
            pass
