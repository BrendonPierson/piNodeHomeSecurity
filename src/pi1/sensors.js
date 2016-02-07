'use strict'

import Firebase from 'firebase'
import moment from 'moment'
import exit from '../utils/exit'
import pollAlarm from './pollAlarm'
import {
  buzzer,
  led,
  button,
  door
} from './pinConfig'

const ref = new Firebase("https://securepenning.firebaseio.com/")
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
  console.log("backDoor changed to: ", value, " at ", moment().format("dddd, MMMM Do YYYY, h:mm:ss a"))
})

button.watch((err, value) => {
  if (err) exit()
  if (value === 0) {
    console.log("disarm push button pressed at: ", moment().format("dddd, MMMM Do YYYY, h:mm:ss a"))
    ref.child('security').child('siren').set(0)
    ref.child('security').child('armed').set(0)
  }
})

process.on('SIGINT', () => {
  console.log("Exiting cleanly from gpio.js at: ", moment().format("dddd, MMMM Do YYYY, h:mm:ss a"))
  exit(pins)
})
