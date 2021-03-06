import mem from 'mem'
import amqp, { Channel } from 'amqplib'
import delay from 'delay'
import { AnyMessage, SubscribeOptions } from '@zwolf/turbine'

import subscribe from './subscribe'
import publish from './publish'

import { EXCHANGE } from './config'

interface DriverConfig {
  url: string,
}

const createChannel = async (config: DriverConfig): Promise<Channel> => {
  try {
    const conn = await amqp.connect(config.url)
    const channel = await conn.createChannel()
    channel.assertExchange(EXCHANGE, 'topic', { durable: false })
    return channel
  } catch (error) {
    console.error(error)
    console.warn('Warning: could not create channel. Waiting 10 seconds...')
    await delay(10 * 1000)
    return createChannel(config)
  }
}

const assertChannel = mem(createChannel)

const createDriver = (config: DriverConfig) => {
  return {
    publish: async (message: AnyMessage) => {
      const channel = await assertChannel(config)
      return publish(channel, message)
    },
    subscribe: async (options: SubscribeOptions) => {
      const channel = await assertChannel(config)
      return subscribe(channel, options)
    },
  }
}

export default createDriver
