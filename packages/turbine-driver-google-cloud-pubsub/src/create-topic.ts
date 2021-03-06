import mem from 'mem'
import { ClientConfig } from '@google-cloud/pubsub/build/src/pubsub'
import { debuglog } from '@zwolf/turbine'

import createPubSub from './create-pub-sub'

const createTopic = mem(
  async (config: ClientConfig, topicName: string) => {
    const pubsub = createPubSub(config)
    const topic = pubsub.topic(topicName)
    const [topicExists] = await topic.exists()
    if (!topicExists) {
      debuglog(`Creating topic: ${topicName}`)
      await pubsub.createTopic(topicName)
    }
    return topic
  },
  {
    maxAge: 1000 * 60 * 60, // 1 hour
    cacheKey: JSON.stringify,
  },
)

export default createTopic
