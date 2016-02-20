require('dotenv').config()
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
import twilio from 'twilio'
const client = new twilio.RestClient(accountSid, authToken)

export default function() {
  client.messages.create({
    body: "SOMEONE HAS TRIPPED THE ALARM!!!!!!!!!",
    to: process.env.MY_CELL,
    from: process.env.T_CELL
  }, function(err, message) {
    console.log("err", err)
    console.log("message", message)
  })

  client.messages.create({
    body: "SOMEONE HAS TRIPPED THE ALARM!!!!!!!!!",
    to: process.env.ASH_CELL,
    from: process.env.T_CELL
  }, function(err, message) {
    console.log("err", err)
    console.log("message", message)
  })
}
