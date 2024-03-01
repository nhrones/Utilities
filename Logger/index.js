
import { log } from './logger.js'

const obj = {
   Name: "Me",
   Age: 75,
   Email: 'me@home.com'
}

const arr = ["a", 2, "c"]

log(`This is the logger - line 1
Logger - line 2`,
   `test ${Date.now()}`,
   'This is line 3',
   obj,
   arr
)


document.getElementById('btn')?.addEventListener('click', () => {
   log('testing 123', obj)
})
