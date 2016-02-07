'use strict'

import Firebase from 'firebase'
import { FBURL } from '../utils/constants'
import moment from 'moment'
import exit from '../utils/exit'
import pollAlarm from './pollAlarm'
import {
  buzzer,
  led,
  button,
  door
} from './pinConfig'

const ref = new Firebase(FBURL)
const pins = [buzzer, led, button, door]

ref.child('security').on('value', (snapshot) => {
  const data = snapshot.val()
  led.writeSync(data.armed)
  if (data.armed) buzzer.writeSync(data.siren)
  pollAlarm(data)
})

door.watch((err, value) => {
  if (err) exit()

  ref.child('security').child('backDoor').set(value)
  console.log("backDoor changed to: ", value, " at ",
    moment().subtract(6, 'h').format("dddd, MMMM Do YYYY, h:mm:ss a"))
})

button.watch((err, value) => {
  if (err) exit()
  if (value === 0) {
    console.log("disarm push button pressed at: ", moment().subtract(6, 'h').format("dddd, MMMM Do YYYY, h:mm:ss a"))
    ref.child('security').child('armed').set(0, (error) => {
      if (error) {
        console.log("error", error)
      } else {
        ref.child('security').child('siren').set(0)
      }
    })
  }
})

process.on('SIGINT', () => {
  console.log("Exiting cleanly from gpio.js at: ", moment().subtract(6, 'h').format("dddd, MMMM Do YYYY, h:mm:ss a"))
  exit(pins)
})
