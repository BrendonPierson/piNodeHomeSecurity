'use strict'

import Firebase from 'firebase'

const ref = new Firebase("https://securepenning.firebaseio.com/")


export default function pollAlarm(data) {
  let sirenVal = 0

  if (data.backDoor === "Open" || data.frontDoor === "Open" && data.armed === "Armed") {
    setTimeout(() => sirenVal = 1, data.enterDelay * 1000)
  } else if (data.armedWithMotion && data.motion) {
    setTimeout(() => sirenVal = 1, data.enterDelay * 1000)
  }
  if (sirenVal === 1) {
    ref.child('sensors').child('siren').set('On')
  }

  return sirenVal

}
