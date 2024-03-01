import { TypedEvents } from "./typedEvents.js"

/**
 * Map of typed-event-handlers
 * 
 * @template {typeof TypedEvents} T
 * @type {Map<string, (data: T) => void []> }
 */
const eventHandlers = new Map()

/**
 * Register a strongly-typed event-handler to be 
 * executed when a strongly-typed named-event is fired
 * 
 * @template { typeof TypedEvents } T
 * @template { keyof typeof TypedEvents } key
 * @param  { key } event
 * @param { string } id
 * @param { (data: T) => void } handler
 */
export function on(event, id, handler) {
   const keyName = event + "-" + id
   if (eventHandlers && eventHandlers.has(keyName)) {
      const handlers = eventHandlers.get(keyName)
      //@ts-ignore handler mapping issue
      handlers.push(handler)
   } else { // not found - create it
      //@ts-ignore handler mapping issue
      eventHandlers.set(keyName, [handler])
   }
}

/**
 * execute all registered handlers for event name
 * @template { typeof TypedEvents } T
 * @template { keyof typeof TypedEvents } key
 * @param {key} event
 * @param { string } id
 * @param {T[key]} data
 */
export function fire (event, id, data) {
   const keyName = event + "-" + id
   const handlers = eventHandlers.get(keyName)
   if (handlers && Array.isArray(handlers)) {
      for (const handler of handlers) {
         if (data != undefined) {
            handler(data)
         }
      }
   }
}
