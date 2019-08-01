# twilio-nts (serverless)

[![Build Status](https://travis-ci.org/bengreenier/twilio-nts-serverless.svg?branch=master)](https://travis-ci.org/bengreenier/twilio-nts-serverless)

A super-light frontend for the [Twilio NTS](https://www.twilio.com/docs/stun-turn) service.

## Why

The Twilio NTS service allows usage of Twilio Infrastructure for STUN/TURN communication over the web. In order to obtain access to the service, a caller must provide their Twilio SID and Authentication key, which can be used to obtain `iceServers` data. Since the SID and Authentication key are secrets, they cannot be included in client applications. Providing some lightweight logic that can be run serverside is one solution to grant client applications access to this data.

Pricing for Twilio NTS can be found [on their pricing page](https://www.twilio.com/stun-turn/pricing).

## How

Use the [serverless](https://serverless.com/) toolset to deploy the function logic from the `fn` directory of this project. Additional instructions can be found [in the inner README](./fn/README.md).

### API

The API is very simple - An example GET request and response is shown below:

```
GET http://twilio-nts-serverless.azurewebsites.net/api/getToken HTTP/1.1
Host: twilio-nts-serverless.azurewebsites.net

HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Server: Microsoft-IIS/10.0
X-Powered-By: ASP.NET
Date: Thu, 21 Mar 2019 00:22:16 GMT

{
  "iceServers": [
    {"url":"stun:global.stun.twilio.com:3478?transport=udp"},       
    {"url":"turn:global.turn.twilio.com:3478?transport=udp","username":"redacted","credential":"redacted"},
    {"url":"turn:global.turn.twilio.com:3478?transport=tcp","username":"redacted","credential":"redacted"},
    {"url":"turn:global.turn.twilio.com:443?transport=tcp","username":"redacted","credential":"redacted"}
  ]
}

```

## License

MIT
