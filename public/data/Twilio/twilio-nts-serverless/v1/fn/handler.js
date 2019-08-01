const Twilio = require('twilio')
let client

module.exports.getToken = function (context) {
  if (context.__stubs && context.__stubs.client) {
    client = context.__stubs.client
  } else {
    client = Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH)
  }

  client.tokens.create().then((token) => {
    context.log(`[${new Date().toISOString()}] Token created`)

    context.res = {
      body: JSON.stringify({ iceServers: token.iceServers }),
      status: 200
    }
  }, (err) => {
    context.log(`[${new Date().toISOString()}] Token creation failed: ${err.toString()}`)

    context.res = {
      body: JSON.stringify({ error: err.toString() }),
      status: 500
    }
  }).then(() => {
    context.done()
  })
}
