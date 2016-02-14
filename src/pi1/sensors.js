'use strict'

import Firebase from 'firebase'
import { FBURL } from '../utils/constants'
import moment from 'moment'
import exit from '../utils/exit'

import {
  buzzer,
  led,
  button,
  door
} from './pinConfig'

const ref = new Firebase(FBURL)
const pins = [buzzer, led, button, door]

export function watch() {
  door.watch((err, value) => {
    if (err) exit(pins)

    ref.child('security').child('backDoor').set(value)
    console.log("backDoor changed to: ", value, " at ",
      moment().subtract(6, 'h').format("dddd, MMMM Do YYYY, h:mm:ss a"))
  })

  button.watch((err, value) => {
    if (err) exit(pins)
    if (value === 0) {
      console.log("disarm push button pressed at: ",
        moment().subtract(6, 'h').format("dddd, MMMM Do YYYY, h:mm:ss a"))
      ref.child('security').child('armed').set(0, (error) => {
        if (error) {
          console.log("error", error)
        } else {
          ref.child('security').child('siren').set(0)
        }
      })
    }
  })
}

export function light(armed) {
  console.log("light firing")
  led.write(armed, (err) => console.log(err))
}

export function buzz(siren) {
  console.log("siren firing")
  buzzer.write(siren, (err) => console.log(err))
}

export function unexportPins() {
  exit(pins)
}
