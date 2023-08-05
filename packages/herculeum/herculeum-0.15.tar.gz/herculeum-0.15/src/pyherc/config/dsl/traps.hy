;; -*- coding: utf-8 -*-

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

(defmacro traps-dsl []
  `(import [pyherc.data.traps [Caltrops PitTrap]]))

(defmacro traps [&rest trap-list]
  (setv output {})
  (for [trap trap-list]         
    (do
     (setv params-out {})
     (setv params-in (iter (slice trap 2)))
     (for [x params-in] (assoc params-out x (next params-in)))
     (assoc output (first trap) [(second trap) params-out])))
  `(defn init-traps []
     "configure traps"
     ~output))

;;  key               Type      Parameters
;; {"small caltrops" [Caltrops {"damage" 1}]}
