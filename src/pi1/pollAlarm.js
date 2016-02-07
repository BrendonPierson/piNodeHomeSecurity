'use strict'

import Firebase from 'firebase'

const ref = new Firebase("https://securepenning.firebaseio.com/")

export default function pollAlarm(data) {

  if (data.backDoor || data.frontDoor && data.armed) {
    setTimeout(() => ref.child('security').child('siren').set(1))
  } else if (data.armedWithMotion && data.motion) {
    setTimeout(() => ref.child('security').child('siren').set(1))
  }
}
