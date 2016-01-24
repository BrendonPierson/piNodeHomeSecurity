'use strict'

import { Gpio } from 'onoff'

export const buzzer = new Gpio(17, "low")
export const led = new Gpio(26, "low")
export const button = new Gpio(18, "in", "both")
export const door = new Gpio(21, "in", "both", { debounceTimeout: 200 })
export const motion = new Gpio(19, "in", "both", { debounceTimeout: 100 })
