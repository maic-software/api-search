const assert = require('assert')
const handler = require('../handler').getToken
/* eslint-env node, mocha */

const buildContext = (create, done) => {
  const ctx = {
    res: {},
    done: () => {
      done(ctx)
    },
    log: function () {
      ctx.__logData.push(...arguments)
    },
    __logData: [],
    __stubs: {
      client: {
        tokens: {
          create: () => {
            return new Promise(create)
          }
        }
      }
    }
  }

  return ctx
}

describe('twilio-nts-serverless', () => {
  it('generates creds', (done) => {
    const resData = {
      iceServers: [
        {
          isValid: true
        }
      ]
    }
    const alloc = (resolve, reject) => {
      resolve(resData)
    }
    const checks = (ctx) => {
      assert.strictEqual(ctx.res.status, 200)
      assert.strictEqual(ctx.res.body, JSON.stringify(resData))
      assert.ok(/Token created/.test(ctx.__logData[0]))
      done()
    }

    handler(buildContext(alloc, checks))
  })

  it('handles failures', (done) => {
    const errorMsg = 'failed to succeed'
    const alloc = (resolve, reject) => {
      reject(new Error(errorMsg))
    }
    const checks = (ctx) => {
      assert.strictEqual(ctx.res.status, 500)
      assert.strictEqual(ctx.res.body, JSON.stringify({
        error: `Error: ${errorMsg}`
      }))
      assert.ok(/Token creation failed/.test(ctx.__logData[0]))
      done()
    }

    handler(buildContext(alloc, checks))
  })
})
