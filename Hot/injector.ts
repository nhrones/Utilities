
/**
 * This function recieves the raw text from index.html.  
 * We then replace the body-end-tag </body> tag with our 
 * custom WebSocket client code.   
 */
export const inject = async (fullPath: string) => {

   const indexString = await Deno.readTextFile(fullPath)
   const injectString = await Deno.readTextFile('./dist/wsClient.js')
   const endOfBody = indexString.indexOf('</body>')

   if (endOfBody > 5) {
      const newBody = indexString.replace('</body>', `
   <script type=module id="injected">
${injectString}
   </script>
   </body>`);
      return newBody
   } else {
      console.log('No </body> found!')
      return indexString
   }
}

// /** The script string to inject */
// const injectString = `(function () {
//    const socket = new WebSocket(location.origin.replace("http", "ws"))
//    console.log("CONNECTING")
//    socket.onopen = () => {
//       console.log("CONNECTED")
//    }
//    socket.onerror = () => {
//       switch (socket.readyState) {
//          case EventSource.CLOSED:
//             console.log("DISCONNECTED")
//             break
//       }
//    }
//    socket.onmessage = (e) => {
//       try {
//          const action  = e.data
//          console.log("sse got action - ", action)
//          if (action === "refreshcss") {
//             console.log("refreshCSS()")
//             const sheets = [].slice.call(document.getElementsByTagName("link"))
//             const head = document.getElementsByTagName("head")[0]
//             for (let i = 0; i < sheets.length; ++i) {
//                const elem = sheets[i]
//                const parent = elem.parentElement || head
//                parent.removeChild(elem)
//                parent.appendChild(elem)
//             }
//          } else if (action === "reload") {
//             console.log("Reload requested!")
//             window.location.reload()
//          }
//       } catch (err) {
//          console.info("err - ", err)
//       }
//    }
// })()`
