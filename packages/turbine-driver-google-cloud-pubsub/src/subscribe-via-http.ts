import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import { SubscribeOptions } from '@stayradiated/turbine'
import { ClientConfig } from '@google-cloud/pubsub/build/src/pubsub'

import { PORT } from './constants'

import createPushSubscription from './create-push-subscription'

const parseSubscriptionPath = (subscriptionPath: string) => {
  const segments = subscriptionPath.split('/')
  const subscriptionName = segments[segments.length - 1]
  const topicName = subscriptionName.match(/\+(.+)$/)[1]
  return { subscriptionName, topicName }
}

const subscribeViaHTTP = async (
  config: ClientConfig,
  options: SubscribeOptions,
  pushEndpoint: string,
) => {
  const { serviceName, events } = options

  const app = express()

  app.use(bodyParser.json())

  app.post('/', async (req: Request, res: Response) => {
    if (!req.body) {
      const msg = 'no Pub/Sub message received'
      console.error(`error: ${msg}`)
      res.status(400).send(`Bad Request: ${msg}`)
      return
    }

    if (!req.body.message) {
      const msg = 'invalid Pub/Sub message format'
      console.error(`error: ${msg}`)
      res.status(400).send(`Bad Request: ${msg}`)
      return
    }

    try {
      const { topicName } = parseSubscriptionPath(req.body.subscription)

      const pubSubMessage = req.body.message
      const payload = JSON.parse(
        Buffer.from(pubSubMessage.data, 'base64').toString('utf8'),
      )

      await Promise.all(
        events
          .filter((event) => {
            return event[0] === topicName
          })
          .map((event) => {
            return event[1](payload)
          }),
      )

      res.status(204).end()
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .send(`Server Error: ${error.message}`)
        .end()
    }
  })

  await Promise.all(
    events.map(async (event) => {
      const [topicName] = event

      const subscriptionName = `push-${serviceName}+${topicName}`

      await createPushSubscription({
        config,
        topicName,
        subscriptionName,
        pushEndpoint,
      })
    }),
  )

  const server = app.listen(PORT, () => {
    console.info(`Listening for messages on port ${PORT}`)
  })

  server.setTimeout(60 * 60 * 1000) // 1 hour
}

export default subscribeViaHTTP