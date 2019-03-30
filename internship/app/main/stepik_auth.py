from .. import oauth
import config_reader as cr
from requests import ConnectionError as ConnectionErrorRe, Timeout, session
from requests.auth import HTTPBasicAuth


# приложение oauth
stepic_oauth = oauth.remote_app('Internship',
    request_token_url = None,
    access_token_url = 'https://stepik.org/oauth2/token/',
    authorize_url = 'https://stepik.org/oauth2/authorize/',
    consumer_key = cr.get_stepic_client_id(),
    consumer_secret = cr.get_stepic_client_secret(),
    request_token_params = {'scope': 'read write'},
    access_token_method = 'POST',
)


class StepicAgent:

    def __init__(self, token):
        self.__token__ = token
        self.__link__ = 'https://stepik.org/api/stepics/1'
        self.__session__ = session()


    def __send_get_request__(self, data={}, headers={}):
        headers['Authorization'] = 'Bearer ' + self.__token__
        response = None
        try:
            response = self.__session__.get(self.__link__, data=data, headers=headers)
        except ConnectionErrorRe:
            print('Bad connection: ', self.__link__)
        except Timeout:
            print('Timeout: ', self.__link__)

        return response


    def get_profile_info(self):
        response = self.__send_get_request__().json()
        name = response['users'][0]['full_name']
        avatar = response['users'][0]['avatar']
        stepic_id = response['users'][0]['id']

        return name, avatar, str(stepic_id)
