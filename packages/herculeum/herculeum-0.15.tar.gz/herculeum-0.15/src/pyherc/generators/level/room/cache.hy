;; -*- coding: utf-8 -*-
;;
;;  Copyright 2010-2015 Tuukka Turto
;;
;;  This file is part of pyherc.
;;
;;  pyherc is free software: you can redistribute it and/or modify
;;  it under the terms of the GNU General Public License as published by
;;  the Free Software Foundation, either version 3 of the License, or
;;  (at your option) any later version.
;;
;;  pyherc is distributed in the hope that it will be useful,
;;  but WITHOUT ANY WARRANTY; without even the implied warranty of
;;  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
;;  GNU General Public License for more details.
;;
;;  You should have received a copy of the GNU General Public License
;;  along with pyherc.  If not, see <http://www.gnu.org/licenses/>.

(require hy.contrib.anaphoric)
(require pyherc.macros)

(import [pyherc.data [add-location-feature ornamentation]]
        [pyherc.data.features [new-cache]]
        [pyherc.generators.level.partitioners [section-to-map section-level
                                               section-floor section-data]]
        [pyherc.generators.level.room.circle [CircularRoomGenerator]])

(defn cache-creator [cache-tiles position-selector item-selector
                     character-selector rng]
  "create cache creator"
  (fn [section &optional [trap-generator nil]]
    "fill cache with items and characters"
    (ap-each (position-selector section)
             (add-new-cache cache-tiles
                            (section-level section)
                            (section-to-map section it)
                            character-selector
                            item-selector
                            rng))))

(defn add-new-cache [cache-tiles level location character-selector item-selector
                     rng]
  "add new cache"
  (ornamentation level location (.choice rng cache-tiles))
  (add-location-feature level location
                        (new-cache level
                                   location
                                   (item-selector)
                                   (character-selector))))

(defclass CacheRoomGenerator [CircularRoomGenerator]
  "generator for cache rooms"
  [[--init-- (fn [self floor-tile corridor-tile cache-creator level-types]
               "default constructor"
               (-> (super) (.--init-- floor-tile corridor-tile level-types))
               (setv self.cache-creator cache-creator)
               nil)]
   [generate-room (fn [self section]
                    "generate a new room"
                    (-> (super) (.generate-room section))
                    (self.cache-creator (section-level section)
                                        (section-to-map section
                                                        self.center-point)))]])
