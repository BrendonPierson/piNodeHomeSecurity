'use strict'

import Firebase from 'firebase'
import {
  FBURL
}
from '../utils/constants'
import moment from 'moment'
import exit from '../utils/exit'
import Thermometer from 'therm-ds18b20'

import {
  motion,
  led,
  frontDoor
}
from './pinConfig'

const ref = new Firebase(FBURL)
const pins = [led, frontDoor, motion]

export const indoorThermometer = new Thermometer({
  // https://github.com/chamerling/ds18b20
  id: '28-021500cf61ff', // device id
  interval: 600000 // interval in ms, 600000ms = 10min
}).on('init', () => {
  console.log('inited')
}).on('data', (data) => {
  const date = Date.now()
  data.F = data.C * (9 / 5) + 32
  if (data) ref.child('sensors').child('indoorTemp').child(date).set({ data })
}).on('error', (error) => {
  console.log(error)
})


export function watch() {

  frontDoor.watch((err, value) => {
    if (err) exit(pins)

    ref.child('security').child('frontDoor').set(value)
    console.log("frontDoor changed to: ", value, " at ",
      moment().subtract(6, 'h').format("dddd, MMMM Do YYYY, h:mm:ss a"))
  })

  motion.watch((err, value) => {
    if (err) exit(pins)

    ref.child('security').child('motion').set(value)
    console.log("motion changed to: ", value, " at ",
      moment().subtract(6, 'h').format("dddd, MMMM Do YYYY, h:mm:ss a"))
  })
}

export function light(armed) {
  led.writeSync(armed)
}

export function unexportPins() {
  exit(pins)
}
