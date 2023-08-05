# -*- coding: utf-8 -*-
#
# Copyright 2015 Thomas Amland
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import logging
import actors.internal.cell
import actors.internal.factory
from actors.future import Promise
from actors.ref import ActorRef, InternalRef
from actors.actor import Actor
from actors.internal.dispatcher import Dispatcher
from actors.internal.messages import Terminate, Start, DeadLetter
from actors.internal.executor import Executor


class ActorSystem(actors.internal.factory.ActorFactory):

    def __init__(self):
        self.default_dispatcher = Dispatcher(Executor())
        self._dead_letters = _DeadLetterRef()
        self._terminate_promise = Promise()
        self._init_guardian()
        actors.internal.factory.ActorFactory.__init__(self, self, self._guardian)

    def _init_guardian(self):
        class Empty(Actor):
            def receive(self, message):
                pass

            def post_stop(self):
                pass

        cell = actors.internal.cell.Cell(Empty, dispatcher=self.default_dispatcher,
                                         system=self, parent=None)
        self._guardian = InternalRef(cell)
        self._guardian.send_system_message(Start)

    def terminate(self):
        self._guardian.send_system_message(Terminate)
        self.default_dispatcher.await_shutdown()

    @property
    def dead_letters(self):
        return self._dead_letters

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.terminate()


class Guardian(Actor):
    def __init__(self):
        super(Guardian, self).__init__()

    def receive(self, message):
        assert False, "Should not be called"


class _DeadLetterRef(ActorRef):
    def __init__(self):
        super(_DeadLetterRef, self).__init__(None)
        self._logger = logging.getLogger('dead letter')

    def tell(self, message, sender=None):
        if isinstance(message, DeadLetter):
            self._logger.debug("Message %r from %r to %r was not delivered.",
                message.message, message.sender, message.recipient)
        else:
            self._logger.debug("Message %r from %r was not delivered.")
