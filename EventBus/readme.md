# Strongly-Typed EventBus Factory
 
## busFactory
This library contains a builder function that returns a strongly-typed EventBus object.   
The builder function takes a `type` parameter that is a set of named events as \<name: type\>.

## EventBus
The generic object returned by the builder; an EventBus object, is used to register and dispatch strongly typed event callbacks. 

This generic object exposes two methods:
 - `on` - this method registers a strongly-typed callback to be executed whenever the named event is emmited (fired).    
 The on method expects three args: 
    - the name of the event   
    - the identity to register with this name (callbacks are registered as name+id)   
    - the callback function to be executed when an event is emmited with this name+id   
       
 - `fire` - this method is used to emmit a named strongly-typed event. The parameters passed with fire, are enforced to be the `exact` type for this event name.
 The fire method expects three args: 
    - the name of the event   
    - a target id (callbacks are registered as name+id)   
    - the expected parameter type(s) for this event type (enforced by typescript)
    
These two methods will enforce using only the type names and parameters that were used to call the generic `buildEventBus` function.     
Note: more than one type-contract-object can be passed to the generic builder as an intersection.    
See: /example/main.ts  

A strongly-typed EventBus prevents:
 - Listening for, or dispatching, events that don't exist
 - Listening for events with incorrect callback parameters
 - Dispatching events with incorrect args
 
 ## Usage
 The generic builder function and the returned generic EventBus object require an `EventType` type variable T:   
`<T extends EventContract<T>>`
```ts
// our event-types type
type MyEventTypes = {
   A: boolean,
   B: null,
   C: { id: number, name: string }
};

// we pass this type into the build function
const eventBus = buildEventBus<MyEventTypes>();

// here we register a callback for the event named `A`
eventBus.on("A", "1", (e) => console.log('A: ', e));

// fire an event 'A' with id 1
eventBus.fire("A", "1", true);  // logs A: true

// fire an event 'A' with id 2
eventBus.fire("A", "2", true ); 
// ^ no response ^ no callback had been registered for event name 'A' with id 2

// fire an event 'A' with id 1
eventBus.fire("A", "1", "test");  
// Error - arg[3] must be ^ a boolean

// fire an event 'D' with id 1
eventBus.fire("D", "1", true);  
// Error - no event name 'D' exists in MyEvents
```
## Example: 
A complete example can be exersized by running **_main.ts_** in the **_./example/_** folder.