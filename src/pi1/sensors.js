'use strict'

import Firebase from 'firebase'
import exit from './utils/exit'
import pollAlarm from './pollAlarm'
import {
  buzzer,
  led,
  button,
  door
} from './pinConfig'

const ref = new Firebase("https://securepenning.firebaseio.com/")
const pins = [buzzer, led, button, door]

ref.child('sensors').on('value', (snapshot) => {
  const data = snapshot.val()
  // If led is lit, system is armed
  if (data.alarmSystem === "Armed") {
    led.writeSync(1)
  } else {
    led.writeSync(0)
  }
  // See if the change should cause the alarm to go off
  buzzer.writeSync(pollAlarm(data))
})

door.watch((err, value) => {
  if (err) exit()

  if (value === 1) {
    ref.child('sensors').child('backDoor').set('Closed')
    console.log("Backdoor closed at: ", new Date().toLocaleTimeString())
  } else {
    ref.child('sensors').child('backDoor').set('Open')
    console.log("backdoor open at: ", new Date().toLocaleTimeString())
  }
})

button.watch((err, value) => {
  if (err) exit()
  if (value === 0) {
    console.log("disarm push button pressed at: ", new Date().toLocaleTimeString())
    buzzer.writeSync(0)
    ref.child('sensors').child('siren').set('Off')
    ref.child('sensors').child('alarmSystem').set('Disarmed')
  }
})

process.on('SIGINT', () => {
  console.log("Exiting cleanly from gpio.js at: ", new Date().toLocaleTimeString())
  exit(pins)
})
