'use strict'
import Firebase from 'firebase'
import {
  FBURL
} from '../utils/constants'
import auth from '../utils/auth'
import moment from 'moment'
import text from './textMsg'

import {
  watch,
  light,
  unexportPins,
  indoorThermometer
} from './sensors'

const ref = new Firebase(FBURL)
auth(ref)

watch()
indoorThermometer.run()

ref.child('security').on('value', (snapshot) => {
  const data = snapshot.val()
  light(data.armed)
  if (data.siren)
    text()
})

process.on('SIGINT', () => {
  console.log("Exiting cleanly from gpio.js at: ",
    moment().subtract(6, 'h').format("dddd, MMMM Do YYYY, h:mm:ss a"))
  unexportPins()
})
