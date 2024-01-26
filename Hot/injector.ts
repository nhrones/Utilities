
/**
 * This function recieves the raw text from index.html.  
 * We then replace the body-end-tag </body> tag with our 
 * custom WebSocket client code.   
 */
export const inject = async (fullPath: string) => {

   const body = await Deno.readTextFile(fullPath)
   const endOfBody = body.indexOf('</body>')
   if (endOfBody > 5) {
      const injectString = await Deno.readTextFile('./client-ws.js')
      const newBody = body.replace('</body>', `
   <script type=module id="injected">
${injectString}
   </script>
   </body>`);
      return newBody
   } else {
      console.log('No </body> found!')
      return body
   }
}