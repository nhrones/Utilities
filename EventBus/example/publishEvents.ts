
import { fire } from './main.ts'

export const publish = () => {

   let thisID = '1'

   // dispatch event 'one' = string
   fire("one", thisID, "One")

   // dispatch event 'two' = number
   fire("two", thisID, 2)

   // dispatch event 'three' = boolean
   fire("three", thisID, true)

   // dispatch event 'four' = null
   fire("four", thisID, null)

   // dispatch event 'Five' = {id: 123, name: me}
   fire("five", thisID, { id: 123, name: thisID })

}
