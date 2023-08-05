;; -*- coding: utf-8 -*-
;;
;;   Copyright 2010-2015 Tuukka Turto
;;
;;   This file is part of pyherc.
;;
;;   pyherc is free software: you can redistribute it and/or modify
;;   it under the terms of the GNU General Public License as published by
;;   the Free Software Foundation, either version 3 of the License, or
;;   (at your option) any later version.
;;
;;   pyherc is distributed in the hope that it will be useful,
;;   but WITHOUT ANY WARRANTY; without even the implied warranty of
;;   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
;;   GNU General Public License for more details.
;;
;;   You should have received a copy of the GNU General Public License
;;   along with pyherc.  If not, see <http://www.gnu.org/licenses/>.

(require hy.contrib.anaphoric)
(require pyherc.aspects)
(require pyherc.macros)
(import [pyherc.aspects [log-debug]]
        [pyherc.data [skill-ready? cooldown blocks-movement get-character
                      get-characters add-character]]
        [pyherc.data.level [traps↜]]
        [pyherc.data.geometry [area-around]]
        [pyherc.data.constants [Duration]]
        [pyherc.events.mitosis [new-mitosis-event]])

(defclass MitosisAction []
  [[--init-- #d(fn [self character character-generator rng character-limit dying-rules]
                 "default constructor"
                 (-> (super) (.--init--))
                 (setv self.character character)
                 (setv self.character-generator character-generator)
                 (setv self.rng rng)
                 (setv self.character-limit character-limit)
                 (setv self.dying-rules dying-rules)
                 nil)]
   [legal? #d(fn [self]
               "check if action is possible to perform"
               (let [[location self.character.location]
                     [level self.character.level]]
                 (if (and
                      (skill-ready? self.character "mitosis")
                      (list (free-tiles level (area-around location)))
                      (< (count (ap-filter (= self.character.name it.name) (get-characters level)))
                         self.character-limit))
                   true false)))]
   [execute #d(fn [self]
                "execute the action"
                (when (.legal? self)
                  (let [[new-character (self.character-generator self.character.name)]
                        [location self.character.location]
                        [level self.character.level]
                        [tiles (list (free-tiles level (area-around location)))]]
                    (add-character level (.choice self.rng tiles) new-character)
                    (.add-to-tick self.character Duration.very-slow)
                    (.add-to-tick new-character Duration.very-slow)
                    (cooldown self.character "mitosis" (* 6 Duration.very-slow))
                    (cooldown new-character "mitosis" (* 6 Duration.very-slow))
                    (.raise-event self.character (new-mitosis-event self.character
                                                                    new-character))
                    (ap-each (traps↜ new-character.level new-character.location)
                             (.on-enter it new-character))
                    (.check-dying self.dying-rules new-character))))]])

#d(defn free-tiles [level tiles]
    (ap-filter (not (or
                     (blocks-movement level it)
                     (get-character level it)))
               tiles))
