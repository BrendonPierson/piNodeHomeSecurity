'use strict'

import Firebase from 'firebase'
import { FBURL } from '../utils/constants'
import moment from 'moment'

import {
  watch,
  light,
  unexportPins
} from './sensors'

const ref = new Firebase(FBURL)

watch()

ref.child('security').on('value', (snapshot) => {
  const data = snapshot.val()
  light(data.armed)
})

process.on('SIGINT', () => {
  console.log("Exiting cleanly from gpio.js at: ",
    moment().subtract(6, 'h').format("dddd, MMMM Do YYYY, h:mm:ss a"))
  unexportPins()
})
