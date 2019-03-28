from requests import ConnectionError as ConnectionErrorRe, Timeout, session
from requests.auth import HTTPBasicAuth
# import json


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
