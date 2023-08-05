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

(defn new-dungeon []
  "create new instance of dungeon config"
  {})

(defn add-level [dungeon level]
  "add new level config into dungeon config"
  (assoc dungeon (:level-name level) level))

(defmacro merge-component-list [component-name dungeon level]
  `(.extend (get (get ~dungeon (:level-name level)) ~component-name)
            (get ~level ~component-name)))

(defmacro level-config [component-name dungeon level-name]
  `(list-comp x [x (~component-name (get ~dungeon ~level-name))]))

(defn merge-level [dungeon level]
  "merge new level config into existing dungeon data"
  (when (not (in (:level-name level) dungeon))    
    (add-level dungeon (new-level (:level-name level)
                                  [] [] [] [] [] [] (:description level))))
  (ap-each (genexpr comp [comp (.keys level)] (not (in comp [:level-name :description])))
           (merge-component-list it dungeon level)))

(defn new-level [level-name room-generators partitioners decorators
                 items characters portal-config description]
  "create new instance of level config"
  {:level-name level-name
   :description description
   :room-generators room-generators
   :partitioners partitioners
   :decorators decorators
   :items items
   :characters characters
   :portal-config portal-config})

(defn room-generators [dungeon level-name]
  "get room generators for given level"
  (level-config :room-generators dungeon level-name))

(defn level-partitioners [dungeon level-name]
  "get level partitioners for given level"
  (level-config :partitioners dungeon level-name))

(defn decorators [dungeon level-name]
  "get level decorators for given level"
  (level-config :decorators dungeon level-name))

(defn items [dungeon level-name]
  "get items for given level"
  (level-config :items dungeon level-name))

(defn characters [dungeon level-name]
  "get characters for given level"
  (level-config :characters dungeon level-name))

(defn portals [dungeon level-name]
  "get portal configs"
  (level-config :portal-config dungeon level-name))

(defn description [dungeon level-name]
  "get level description"
  (:description (get dungeon level-name)))
