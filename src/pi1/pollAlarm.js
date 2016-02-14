'use strict'

import Firebase from 'firebase'
import { FBURL } from '../utils/constants'

const ref = new Firebase(FBURL)

function soundSiren(data) {
  setTimeout(() => {ref.child('security').child('siren').set(1)}, data.enterDelay * 1000)
}

export default function pollAlarm(data) {

  if ((!data.backDoor || !data.frontDoor) && data.armed) {
    soundSiren(data)
  } else if (data.armedWithMotion && data.motion) {
    soundSiren(data)
  }
}
