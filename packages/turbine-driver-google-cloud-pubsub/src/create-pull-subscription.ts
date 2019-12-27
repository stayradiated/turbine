import mem from 'mem'
import { ClientConfig } from '@google-cloud/pubsub/build/src/pubsub'

import createTopic from './create-topic'

interface CreatePullSubscriptionOptions {
  config: ClientConfig,
  topicName: string,
  subscriptionName: string,
}

const createPullSubscription = mem(
  async (options: CreatePullSubscriptionOptions) => {
    const { config, topicName, subscriptionName } = options

    const topic = await createTopic(config, topicName)
    const subscription = topic.subscription(subscriptionName)
    const [subscriptionExists] = await subscription.exists()
    if (!subscriptionExists) {
      await topic.createSubscription(subscriptionName)
    }
    return subscription
  },
  {
    cacheKey: JSON.stringify,
  },
)

export default createPullSubscription
