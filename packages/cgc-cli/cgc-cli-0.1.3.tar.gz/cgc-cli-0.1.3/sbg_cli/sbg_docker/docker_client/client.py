__author__ = 'sinisa'

import os
import sys
import json
import subprocess
from sys import stdout
from subprocess import Popen
from requests.exceptions import ConnectionError
from docker.client import Client
from docker.utils import kwargs_from_env
from docker.errors import APIError
from sbg_cli.sbg_docker.error import SBGError
from sbg_cli.sbg_docker.docker_client.utils import update_docker_cfg
from sbg_cli.sbg_docker.docker_client.shell import Bash


DEFAULT_DOCKER_API_VERSION = '1.17'
DEFAULT_DOCKER_CLIENT_TIMEOUT = 240

DEFAULT_DOCKER_MACHINE_NAME = 'default'
DEFAULT_DOCKER_CERT_PATH_DOCKER_MACHINE = os.path.join(os.path.expanduser("~"),
                                            '.docker/machine/machines/default')

DEFAULT_DOCKER_HOST_BOOT2DOCKER = 'tcp://192.168.59.103:2376'
DEFAULT_DOCKER_CERT_PATH_BOOT2DOCKER = os.path.join(os.path.expanduser("~"),
                                        '.boot2docker/certs/boot2docker-vm')
DEFAULT_DOCKER_TLS_VERIFY = '1'

DEFAULT_CONFIG = {
    "version": DEFAULT_DOCKER_API_VERSION,
    "timeout": DEFAULT_DOCKER_CLIENT_TIMEOUT,
}

DOCKER_CONFIG_FILENAME = os.path.join(os.path.expanduser("~"), '.dockercfg')
DOCKER_CLIENT_SUPPORTED_VERSION = '1.6.0'


class Docker(object):

    def __init__(self, client):
        self.client = client

    @staticmethod
    def detect_docker_machine(docker_machine_name="default"):
        # Check is it boot2docker or docker-machine
        try:
            host = subprocess.check_output(["docker-machine", "url", docker_machine_name]).rstrip()
            return host
        except Exception:
            return None

    @staticmethod
    def set_env_boot2docker():
        docker_host = os.environ.get('DOCKER_HOST', None)
        if not docker_host:
            os.environ['DOCKER_HOST'] = DEFAULT_DOCKER_HOST_BOOT2DOCKER
        docker_cert_path = os.environ.get('DOCKER_CERT_PATH', None)
        if not docker_cert_path:
            os.environ['DOCKER_CERT_PATH'] = DEFAULT_DOCKER_CERT_PATH_BOOT2DOCKER
        docker_tls_verify = os.environ.get('DOCKER_TLS_VERIFY', None)
        if not docker_tls_verify:
            os.environ['DOCKER_TLS_VERIFY'] = DEFAULT_DOCKER_TLS_VERIFY

    @staticmethod
    def set_env_docker_machine(docker_client_url):
        docker_host = os.environ.get('DOCKER_HOST', None)
        if not docker_host:
            os.environ['DOCKER_HOST'] = docker_client_url
        docker_cert_path = os.environ.get('DOCKER_CERT_PATH', None)
        if not docker_cert_path:
            os.environ['DOCKER_CERT_PATH'] = DEFAULT_DOCKER_CERT_PATH_DOCKER_MACHINE
        os.environ['DOCKER_TLS_VERIFY'] = DEFAULT_DOCKER_TLS_VERIFY
        if not os.environ.get('DOCKER_MACHINE_NAME', None):
            os.environ['DOCKER_MACHINE_NAME'] = 'default'
        if not os.environ.get('DOCKER_CERT_PATH'):
            os.environ['DOCKER_CERT_PATH'] = '/Users/Sinisa/.docker/machine/certs/'

    @classmethod
    def docker_client_osx(cls, **kwargs):
        dm = Docker.detect_docker_machine()
        if dm:
            Docker.set_env_docker_machine(dm)
        else:
            Docker.set_env_boot2docker()
        env = kwargs_from_env()
        env['tls'].verify = False
        env.update(kwargs)
        return cls(Client(**env))

    @classmethod
    def docker_client_linux(cls, **kwargs):
        return cls(Client(**kwargs))

    @staticmethod
    def create_docker_client(cfg=None):
        if cfg:
            client_config = {
                "version": cfg.docker_client_version,
                "timeout": cfg.docker_client_timeout,
                }
        else:
            client_config = DEFAULT_CONFIG
        if sys.platform.startswith('darwin'):
            client = Docker.docker_client_osx(**client_config)
        elif sys.platform.startswith('linux'):
            client = Docker.docker_client_linux(**client_config)
        else:
            raise EnvironmentError('Unsupported OS')
        return client

    def check_docker_client(self, supported_version):
        return self.client.version()

    def sh(self, dir, image):
        container = Bash(dir, image).run_shell()
        return container

    def login(self, username, password, registry):
        try:
            res = self.client.login(username, password=password, registry=registry, reauth=True)
            update_docker_cfg(self.client._auth_configs)
        except APIError as e:
            print('Error. {}'.format(e))
            return None
        except ConnectionError as e:
            print('Connection aborted. Please check is boot2docker running.')
            return None
        return res

    def pull(self, image):
        self.client.pull(image)

    def commit(self, container, repository, tag):
        tag = tag or 'latest'
        res = self.client.commit(container, repository=repository, tag=tag)
        return res['Id']

    def push(self, repository, tag):
        tag = tag or 'latest'
        push = Popen(['docker', 'push', ':'.join([repository, tag])], stdout=stdout)
        push.wait()

    def push_cl(self, repository, tag):
        tag = tag or 'latest'
        stream = self.client.push(repository, tag, stream=True, insecure_registry=True)
        for s in stream:
            try:
                line = json.loads(s.decode('utf-8'))
            except Exception:
                sys.stdout.write('\r' + s + '\n')
                sys.stdout.flush()
            else:
                if line.get('progress'):
                    sys.stdout.write("\r{} Progress: {}".format(line.get('status'), line.get('progress')))
                    sys.stdout.flush()
                elif line and line.get('status'):
                    print("{}".format(line.get('status')))
                elif line and line.get('error') and line.get('errorDetail'):
                    print("{} Error Details: {}".format(line.get('error'), line.get('errorDetail', {}).get('message')))
                    raise SBGError("Failed to push image")
        print('Image {} successfully pushed'.format(repository + ':' + tag))

    def remove_container(self, container):
        try:
            return self.client.remove_container(container)
        except APIError as e:
            print('Error. {}'.format(e.message))

    def remove_image(self, image):
        img = self.get_image(image)
        if img:
            try:
                self.client.remove_image(img, force=True)
            except APIError as e:
                print('Error. {}'.format(e.message))
                return None
            else:
                return img['Id']
        else:
            return None

    def get_image(self, image):
        imgs = self.client.images()
        for img in imgs:
            if image in img['RepoTags']:
                return img
        return None

    def run_command(self, image, cmd):
        pass

    def create_from_dockerfile(self, dockerfile):
        pass

    def version(self):
        return self.client.version()

    def images(self):
        return self.client.images()

