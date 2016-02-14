'use strict'

import { Gpio } from 'onoff'

export const frontDoor = new Gpio(21, "in", "both", { debounceTimeout: 200 })
export const motion = new Gpio(19, "in", "both", { debounceTimeout: 100 })
export const led = new Gpio(26, "low")
