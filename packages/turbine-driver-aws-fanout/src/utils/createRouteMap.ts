import { EventList } from '@stayradiated/turbine'

import { RouteMap } from './types'

const createRouteMap = (events: EventList): RouteMap => {
  const routeMap = events.reduce((map, event) => {
    const [type, callback] = event
    map.set(type, callback)
    return map
  }, new Map())
  return routeMap
}

export default createRouteMap
