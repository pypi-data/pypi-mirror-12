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
Factory class for animations
"""

from .animation import Animation
from .attack import AttackHitAnimation
from .damage import DamageTriggeredAnimation
from .death import DeathAnimation
from .dig import DigAnimation
from .healing import HealAddedAnimation, HealTriggeredAnimation
from .inventory import DropAnimation, PickUpAnimation
from .metamorphosis import MetamorphosisAnimation
from .mitosis import MitosisAnimation
from .moving import MoveAnimation
from .perception import NoticeAnimation, LoseFocusAnimation
from .poison import PoisonAddedAnimation, PoisonTriggeredAnimation
from .trap import PlaceTrapAnimation
from pyherc.events import e_event_type

class AnimationFactory():
    """
    Class for creating animations for events

    .. versionadded:: 0.12
    """
    def __init__(self):
        """
        Default constructor
        """
        self.animations = {
            'attack hit': AttackHitAnimation,
            'damage triggered': DamageTriggeredAnimation,
            'death': DeathAnimation,
            'dig': DigAnimation,
            'drop': DropAnimation,
            'heal started': HealAddedAnimation,
            'heal triggered': HealTriggeredAnimation,
            'lose focus': LoseFocusAnimation,
            'metamorphosis': MetamorphosisAnimation,
            'mitosis': MitosisAnimation,
            'move': MoveAnimation,
            'notice': NoticeAnimation,
            'pick up': PickUpAnimation,
            'poisoned': PoisonAddedAnimation,
            'poison triggered': PoisonTriggeredAnimation,
            'trap placed': PlaceTrapAnimation
        }

    def create_animation(self, event):
        """
        Create an animation for event

        :param event: event to create animation for
        :type event: Event
        :returns: animation
        :rtype: Animation
        """
        if e_event_type(event) in self.animations:
            return self.animations[e_event_type(event)](event)
        else:
            return Animation(event)
