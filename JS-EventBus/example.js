import { on, fire } from './eventBus.js'
const id = "0"

// Exersize our named events

// DieTouched event requires an object with a numeric property - index
on("DieTouched", id, (data) => console.log(`Die #${data.index} Touched!`))
fire("DieTouched", id, { index: 2 })

// RollButtonTouched event requires a single number payload
on("RollButtonTouched", id, (data) => console.log(`RollButton Touched!, roll #${data}`))
fire("RollButtonTouched", id, 2)

// ScoreButtonTouched event requires a single number payload
on("ScoreButtonTouched", id, (data) => console.log(`ScoreButton ${data} Touched!`))
fire("ScoreButtonTouched", id, 2)

// The UpdateDie event requires an object payload    
// This payload contains: index number, value number, and a `frozen` flag
on("UpdateDie", id, (data) => console.log(`Update Die #${data.index}
   new value = ${data.value} 
   set frozen? ${data.frozen}`))
fire(
   "UpdateDie",
   id,
   {
      index: 2,
      value: 6,
      frozen: true
   }
)