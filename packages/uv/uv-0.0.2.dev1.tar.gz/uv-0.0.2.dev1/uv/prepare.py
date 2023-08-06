# -*- coding: utf-8 -*-
#
# Copyright (C) 2015, Maximilian Köhl <mail@koehlma.de>
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program. If not, see <http://www.gnu.org/licenses/>.

from .error import UVError
from .handle import HandleType, Handle
from .library import ffi, lib, detach
from .loop import Loop


@ffi.callback('uv_prepare_cb')
def prepare_callback(uv_prepare):
    prepare = detach(uv_prepare)
    if prepare.callback: prepare.callback(prepare)


@HandleType.PREPARE
class Prepare(Handle):
    __slots__ = ['prepare', 'callback']

    def __init__(self, loop: Loop=None, callback: callable=None):
        self.prepare = ffi.new('uv_prepare_t*')
        self.callback = callback
        super().__init__(self.prepare, loop)
        code = lib.uv_prepare_init(self.loop.uv_loop, self.prepare)
        if code < 0: raise UVError(code)

    def start(self, callback: callable=None):
        self.callback = callback or self.callback
        code = lib.uv_prepare_start(self.prepare, prepare_callback)
        if code < 0: raise UVError(code)

    def stop(self):
        code = lib.uv_prepare_stop(self.prepare)
        if code < 0: raise UVError(code)

    __call__ = start
