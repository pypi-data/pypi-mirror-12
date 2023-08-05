# -*- coding: utf-8 -*-

#   Copyright 2010-2015 Tuukka Turto
#
#   This file is part of pyherc.
#
#   pyherc is free software: you can redistribute it and/or modify
#   it under the terms of the GNU General Public License as published by
#   the Free Software Foundation, either version 3 of the License, or
#   (at your option) any later version.
#
#   pyherc is distributed in the hope that it will be useful,
#   but WITHOUT ANY WARRANTY; without even the implied warranty of
#   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#   GNU General Public License for more details.
#
#   You should have received a copy of the GNU General Public License
#   along with pyherc.  If not, see <http://www.gnu.org/licenses/>.

"""
Module defining classes related to inventory actions
"""
from pyherc.data import is_armour, is_weapon, is_boots
from pyherc.aspects import log_debug, log_info
from pyherc.events import new_unequip_event
from pyherc.rules.factory import SubActionFactory


class UnEquipFactory(SubActionFactory):
    """
    Factory for creating unequip actions

    .. versionadded:: 0.8
    """
    @log_debug
    def __init__(self):
        """
        Constructor for this factory
        """
        super().__init__()
        self.sub_action = 'unequip'

    @log_debug
    def can_handle(self, parameters):
        """
        Can this factory process these parameters

        :param parameters: parameters to check
        :returns: True if factory is capable of handling parameters
        :rtype: Boolean
        """
        return self.sub_action == parameters.sub_action

    @log_info
    def get_action(self, parameters):
        """
        Create an unequip action

        :param parameters: parameters used to control creation
        :type parameters: InventoryParameters
        """
        return UnEquipAction(parameters.character, parameters.item)


class UnEquipAction():
    """
    Action for unequiping an item

    .. versionadded:: 0.8
    """
    @log_debug
    def __init__(self, character, item):
        """
        Default constructor

        :param character: character wearing the item
        :type character: Character
        :param item: item to unequip
        :type item: Item
        """
        super().__init__()

        self.character = character
        self.item = item

    @log_info
    def execute(self):
        """
        Executes this action
        """
        if is_armour(self.item):
            self.character.inventory.armour = None
            self.character.raise_event(new_unequip_event(self.character,
                                                         self.item))
        if is_weapon(self.item):
            self.character.inventory.weapon = None
            self.character.raise_event(new_unequip_event(self.character,
                                                         self.item))

        if is_boots(self.item):
            self.character.inventory.boots = None
            self.character.raise_event(new_unequip_event(self.character,
                                                         self.item))

    @log_debug
    def is_legal(self):
        """
        Check if the action is possible to perform

        :returns: True if move is possible, false otherwise
        :rtype: Boolean
        """
        return True
