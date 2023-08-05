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
module for configuring npcs
"""

from herculeum.ai.fungus import FungusAI, GreatFungusAI
from herculeum.ai.rat import RatAI
from herculeum.ai.firebeetle import FireBeetleAI
from herculeum.ai import FlockingHerbivore, SkeletonWarriorAI
from pyherc.generators import creature_config, inventory_config
from pyherc.data.effects import EffectHandle, DamageModifier
from pyherc.rules.constants import (CRUSHING_DAMAGE, LIGHT_DAMAGE,
                                    PIERCING_DAMAGE, POISON_DAMAGE)


def init_creatures(context):
    """
    Initialise creatures''

    :returns: list of configuration items
    :rtype: [CreatureConfiguration]
    """
    surface_manager = context.surface_manager
    config = []

    fungus_f0 = surface_manager.add_icon('fungus_f0',
                                         ':fungus_f0.png',
                                         'F', ['yellow', 'dim'])
    fungus_f1 = surface_manager.add_icon('fungus_f1',
                                         ':fungus_f1.png',
                                         'F', ['yellow', 'dim'])
    config.append(creature_config(name = 'fungus',
                                  body = 4,
                                  finesse = 2,
                                  mind = 1,
                                  hp = 7,
                                  speed = 8,
                                  icons = (fungus_f0, fungus_f1),
                                  attack = 3,
                                  ai = FungusAI))

    great_fungus_f0 = surface_manager.add_icon('great_fungus_f0',
                                               ':great_fungus_f0.png', 
                                               'F', ['white', 'bold'])
    great_fungus_f1 = surface_manager.add_icon('great_fungus_f1',
                                               ':great_fungus_f1.png',
                                               'F', ['white', 'bold'])
    config.append(creature_config(name = 'great fungus',
                                  body = 6,
                                  finesse = 1,
                                  mind = 3,
                                  hp = 12,
                                  speed = 8,
                                  icons = (great_fungus_f0, great_fungus_f1),
                                  attack = 5,
                                  ai = GreatFungusAI))

    spider_f0 = surface_manager.add_icon('spider_f0', ':masked-spider_f0.png', 's', ['white', 'dim'])
    spider_f1 = surface_manager.add_icon('spider_f1', ':masked-spider_f1.png', 's', ['white', 'dim'])
    config.append(creature_config(name = 'spider',
                                  body = 6,
                                  finesse = 12,
                                  mind = 8,
                                  hp = 6,
                                  speed = 1,
                                  icons = (spider_f0, spider_f1),
                                  attack = 4,
                                  ai = FlockingHerbivore,
                                  effect_handles = [EffectHandle(
                                      trigger = 'on attack hit',
                                      effect = 'minor poison',
                                      parameters = None,
                                      charges = 100)]))

    mouse_f0 = surface_manager.add_icon('rat_f0', ':mouse_f0.png', 'r', ['yellow', 'dim'])
    mouse_f1 = surface_manager.add_icon('rat_f1', ':mouse_f1.png', 'r', ['yellow', 'dim'])
    config.append(creature_config(name = 'rat',
                                  body = 4,
                                  finesse = 12,
                                  mind = 2,
                                  hp = 2,
                                  speed = 2,
                                  icons = (mouse_f0, mouse_f1),
                                  attack = 1,
                                  ai = RatAI))

    firebeetle_f0 = surface_manager.add_icon('fire beetle_f0', ':scarab-beetle_f0.png', 'a', ['red'])
    firebeetle_f1 = surface_manager.add_icon('fire beetle_f1', ':scarab-beetle_f1.png', 'a', ['red'])
    config.append(creature_config(name = 'fire beetle',
                                  body = 10,
                                  finesse = 11,
                                  mind = 0,
                                  hp = 4,
                                  speed = 3,
                                  icons = (firebeetle_f0, firebeetle_f1),
                                  attack = 2,
                                  ai = FireBeetleAI))

    skeleton_inventory = [inventory_config(item_name = 'sword',
                                           min_amount = 0,
                                           max_amount = 1,
                                           probability = 100)]

    skeleton_effects = [DamageModifier(modifier = 2,
                                       damage_type = CRUSHING_DAMAGE,
                                       duration = None,
                                       frequency = None,
                                       tick = None,
                                       icon = 0,
                                       title = '',
                                       description = ''),
                        DamageModifier(modifier = 2,
                                       damage_type = LIGHT_DAMAGE,
                                       duration = None,
                                       frequency = None,
                                       tick = None,
                                       icon = 0,
                                       title = '',
                                       description = ''),
                        DamageModifier(modifier = -2,
                                       damage_type = PIERCING_DAMAGE,
                                       duration = None,
                                       frequency = None,
                                       tick = None,
                                       icon = 0,
                                       title = '',
                                       description = ''),
                        DamageModifier(modifier = -2,
                                       damage_type = POISON_DAMAGE,
                                       duration = None,
                                       frequency = None,
                                       tick = None,
                                       icon = 0,
                                       title = '',
                                       description = '')]

    skeleton_f0 = surface_manager.add_icon('skeleton warrior_f0', ':blade-bite_f0.png', 'Z', ['white', 'bold'])
    skeleton_f1 = surface_manager.add_icon('skeleton warrior_f1', ':blade-bite_f1.png', 'Z', ['white', 'bold'])
    config.append(creature_config(name = 'skeleton warrior',
                                  body = 8,
                                  finesse = 11,
                                  mind = 0,
                                  hp = 8,
                                  speed = 4,
                                  icons = (skeleton_f0, skeleton_f1),
                                  attack = 1,
                                  ai = SkeletonWarriorAI,
                                  inventory = skeleton_inventory,
                                  effects = skeleton_effects))

    return config
