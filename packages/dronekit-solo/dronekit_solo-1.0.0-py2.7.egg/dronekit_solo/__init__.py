#!/usr/bin/python

from __future__ import print_function
from dronekit import Vehicle

class SoloVehicle(Vehicle):
    def __init__(self, *args):
        super(SoloVehicle, self).__init__(*args)

        self.__msg_gopro_status = None
        self.__msg_gopro_get_response = None
        self.__msg_gopro_set_response = None

        self.on_message('GOPRO_HEARTBEAT', self.__on_gopro_status)
        self.on_message('GOPRO_GET_RESPONSE', self.__on_gopro_get_response)
        self.on_message('GOPRO_SET_RESPONSE', self.__on_gopro_set_response)

    def __on_gopro_status(self, name, m):
        self.__msg_gopro_status = m.status
        self.notify_observers('gopro_status')

    @property
    def gopro_status(self):
        return self.__msg_gopro_status

    def __on_gopro_get_response(self, name, m):
        self.__msg_gopro_get_response = (m.cmd_id, m.value)
        self.notify_observers('gopro_get_response')

    @property
    def gopro_get_response(self):
        return self.__msg_gopro_get_response

    def __on_gopro_set_response(self, name, m):
        self.__msg_gopro_set_response = (m.cmd_id, m.result)
        self.notify_observers('gopro_set_response')

    @property
    def gopro_set_response(self):
        return self.__msg_gopro_set_response
