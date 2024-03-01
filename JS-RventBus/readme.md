## Javascript EventBus
This is port of my Typescript EventBus lib.

This version is simple javascript that is strongly typed    
using jsdoc comments.

The _example.js_ file will exersize the eventBus using    
a sample typed events in the _typedEvents.js_ file.

## Note:
VS Code settings should have -- "checkJs": true!
This can be done in a tsconfig.json or jsconfig.json file.    
Or, I prefer setting it in the VS Code settings.


Try editing the _on_ and _fire_ code in the example.js file.
```js
   const id = "anID"
   on("nonExistentEvent", id, (data) => console.log('yup!'))
   //    ^^^^^^^^^^
   // will immediately report an error:
   // Argument of type "nonExistentEvent" is not assignable to parameter

   fire("RollButtonTouched", id, "2")
   //                            ^^
   // will immediately report an error:
   // Argument of type 'string' is not assignable to parameter of type 'number'
```

