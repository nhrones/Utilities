
import { on } from './main.ts'

export const subscribe = () => {

   let thisID = "1"

   // subscribes to event 'one' = string
   on("one", thisID, (data: string) => console.log(`handled event "one": ${data}`))

   // subscribes to event 'two' = number
   on("two", thisID, (data: number) => console.log(`handled event "two": ${data}`))

   // subscribes to event 'three' = boolean
   on("three", thisID, (data: boolean) => console.log(`handled event "three": ${data}`))

   // subscribes to event 'four' = null
   on("four", thisID, (e: null) => console.log(`handled event "four": ${e}`))

   // subscribes to event 'Five' = {id: 123, name: me}
   on("five", thisID, (data: {id: number, name: string}) => {
      console.info(`handled event "five": `, data)
   })

}
