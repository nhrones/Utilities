
/** 
 * A factory function that returns a generic strongly-typed EventBus instance 
 * @typeParam T - type that extends EventContract\<T\>
 * @returns EventBus<T> - a strongly-typed EventBus object with the following two methods:   
 * @method on - registers a callback function to be called when the named event is fired (emmited). 
 * @method fire - fires (emmits) the named event, triggering the execution of any registered callback functions 
 */
export function buildEventBus<T extends EventContract<T>>(): EventBus<T> {

   /** 
    * holds an array of event handler for each registered event name 
    */
   const eventHandlers: Map<string, EventHandler[]> = new Map()

   const newEventBus: EventBus<T> = {

      /** 
       * on - registers a handler function to be executed when an event is fired
       *  
       * @param {key} eventName - event name (one of `TypedEvents` only)!
       * @param {string} id - id of a target element (may be an empty string)
       * @param {Handler} handler - event handler callback function
       */
      on<EventName extends keyof T>(
         eventName: EventName,
         id: string,
         handler: EventHandler<T[EventName]>
      ): void {
         // create a keyName that combines the eventName and the target element id (if any)
         const keyName = eventName as string + '-' + id

         // if this keyName has already been registered
         if (eventHandlers.has(keyName)) {
            const handlers = eventHandlers.get(keyName)!
            // push this new handler to it. 
            handlers.push(handler)
         }
         // keyName needs to be registered
         else {
            // when first seen - create it with this handler
            eventHandlers.set(keyName, [handler])
         }

      },

      /** 
       * execute all registered handlers for event name
       * @param {key} eventName - event name - one of `TypedEvents` only!
       * @param {string} id - id of a target element (may be an empty string)
       * @param {TypedEvents[key]} data - data payload, typed for this category of event
       */
      fire<EventName extends keyof T>(
         eventName: EventName,
         id: string,
         data: T[EventName]
      ): void {
         // create a keyName that combines the eventName and the target element id (if any)
         const keyName = eventName as string + '-' + id

         // check for any registered handlers for this unique keyName
         const handlers = eventHandlers!.get(keyName);
         if (handlers) {
            // callback all registered handlers with any data payload
            for (const handler of handlers) {
               // call it!
               handler(data)
            }
         }
      }
   }
   return newEventBus
}

//================================================
//              required types
//================================================

/** generic type for Event-Handler callbacks */
export type EventHandler<T = any> = (data: T) => void;

/** validates each Event Types callback parameters */
export type EventContract<T> = { [K in keyof T]: T[K] }

/** An EventBus interface with typed events and typed callbacks */
export interface EventBus<T extends EventContract<T>> {
   /** registers a callback for a specific named event */
   on<K extends keyof T>(event: K, id: string, handler: EventHandler<T[K]>): void,
   /** fires (emmits) a specific named event with a strongly-typed payload */
   fire<K extends keyof T>(event: K, id: string, args: T[K]): void
}
