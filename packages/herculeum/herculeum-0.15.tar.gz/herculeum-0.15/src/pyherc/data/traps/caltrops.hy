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

(require pyherc.macros)

(import [pyherc.data.damage [new-damage]]
        [pyherc.data.traps.trap [Trap]]
        [pyherc.data [get-traps remove-trap Duration]]
        [pyherc.events [damage-triggered damage-trap-triggered]])

(defclass Caltrops [Trap]
  [[--init-- (fn [self damage &optional [icon nil]]
               (super-init icon)
               (setv self.damage damage)
               nil)]
   [on-enter (fn [self character]
               (let [[damage (new-damage #t(#t(self.damage "piercing")))]
                     [total-damage (damage :target character
                                           :body-part "feet")]]
                 (.raise-event character (damage-trap-triggered character
                                                                self
                                                                total-damage))
                 (.add-to-tick character Duration.slow)))]
   [on-place (fn [self level location]
               (let [[traps (list-comp x [x (get-traps level location)]
                                       (isinstance x Caltrops))]]
                 (when (>= (len traps) 2)
                   (remove-trap level self))))]])
