import type { BaseEvents } from './baseEvents.ts'
import { LocalEvents } from './localEvents.ts'
import { buildEventBus } from '../mod.ts'
import { subscribe } from './subscribeToEvents.ts'
import { publish } from './publishEvents.ts'

/** 
 * Use a factory function to create a new EventBus service. 
 * we use an intersection type from `Base` and `Local` event-types. 
 */
const eventBus = buildEventBus<BaseEvents & LocalEvents> ()

// export our two event functions
export const { on, fire} = eventBus

// create event subscriptions with strongly typed callbacks
subscribe()

// dispatch events with strongly typed payloads
publish()