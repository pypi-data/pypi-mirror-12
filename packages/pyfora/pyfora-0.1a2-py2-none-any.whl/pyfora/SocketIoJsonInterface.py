#   Copyright 2015 Ufora Inc.
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.

import json
from socketIO_client import SocketIO, BaseNamespace
import threading

class SocketIoJsonInterfaceError(Exception):
    pass

class LoginError(SocketIoJsonInterfaceError):
    pass


class SocketIoJsonInterface(object):
    def __init__(self,
                 url,
                 socketIONamespace,
                 events=None):
        if url.endswith('/'):
            # remove trailing slash
            url = url[:-1]
        self.url = url
        self.path = socketIONamespace
        self.events = events or {}

        self.socketIO = None
        self.reactorThread = None
        self.namespace = None
        self.nextMessageId = 0
        self.messageHandlers = {}
        self.lock = threading.Lock()


    def connect(self):
        with self.lock:
            if self._isConnected():
                raise ValueError("'connect' called when already connected")

        with self.lock:
            self.socketIO = SocketIO(self.url)
            self.reactorThread = threading.Thread(target=self.socketIO.wait)
            self.namespace = self.socketIO.define(self._namespaceFactory, self.path)
            self.reactorThread.start()
        return self


    def close(self):
        with self.lock:
            if not self._isConnected():
                return
            reactorThread = self.reactorThread
            self.reactorThread = None
            self.socketIO.disconnect()
        reactorThread.join()


    def isConnected(self):
        with self.lock:
            return self._isConnected()


    def send(self, message, callback):
        with self.lock:
            self._raiseIfNotConnected()
            messageId = self.nextMessageId
            self.nextMessageId += 1
            self.messageHandlers[messageId] = callback

            def encoder(obj):
                if not isinstance(obj, dict) and hasattr(obj, 'toMemoizedJSON'):
                    return obj.toMemoizedJSON()
                return obj

            message['messageId'] = messageId
            self.namespace.emit('message', {'body': json.dumps(message, default=encoder)})


    def on(self, event, callback):
        if event in self.events:
            raise ValueError("Event handler for '%s' already exists" % event)
        self.events[event] = callback


    def _isConnected(self):
        return self.reactorThread is not None


    def _raiseIfNotConnected(self):
        if not self._isConnected():
            raise ValueError('Performing I/O on disconnected socket')

    def _namespaceFactory(self, *args, **kwargs):
        return Namespace(self._onConnected, *args, **kwargs)


    def _triggerEvent(self, event, *args, **kwargs):
        if event in self.events:
            self.events[event](*args, **kwargs)

    def _onConnected(self, namespace):
        self._triggerEvent('connect', None)
        namespace.on('response', self._on_message)
        namespace.on('disconnect', self._on_disconnect)

    def _on_message(self, payload):
        try:
            message = json.loads(payload)
        except:
            self._triggerEvent('invalid_message', payload)
            return

        messageId = message.get('messageId')
        if messageId is None:
            self._triggerEvent('special_message', message)
            return

        callback = self.messageHandlers.get(messageId)
        if callback is None:
            self._triggerEvent('unexpected_message', message)
            return

        if message.get('responseType') != 'SubscribeResponse':
            del self.messageHandlers[messageId]

        callback(message)


    def _on_disconnect(self):
        self._triggerEvent('disconnect')





class Namespace(BaseNamespace):
    def __init__(self, onConnected, *args, **kwargs):
        super(Namespace, self).__init__(*args, **kwargs)
        self.onConnected = onConnected

    def on_connect(self):
        self.onConnected(self)

