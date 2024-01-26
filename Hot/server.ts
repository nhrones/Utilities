import { debounce, join, openWebsite, serveFile } from './deps.ts'
import { DEV } from './constants.ts'
import * as CFG from './config.ts'
import { build } from './builder.ts'
import { host, port } from './constants.ts'
import { inject } from './injector.ts'

/** 
 * The folder that contains the index.html to be served   
 * this option would be entered as cli first arg - Deno.args[0]  
 * default = root folder
 */
const targetFolder = Deno.args[0] || CFG.ServeFolder;

/** our hot reload WebSocket */
let hotSocket: WebSocket


/** Start the server and handle all http requests */
Deno.serve({ hostname: host, port: port },
   async (request: Request): Promise<Response> => {

      let { pathname } = new URL(request.url);

      const upgrade = request.headers.get("upgrade")?.toLowerCase() || "";

      // socket request? 
      if (upgrade === "websocket") {
         const { socket, response } = Deno.upgradeWebSocket(request);
         hotSocket = socket
         if (DEV) console.log(`Browser connected!`)
         // handle any hot-socket errors
         hotSocket.onerror = (e) => {
            const msg = (e instanceof ErrorEvent) ? e.message : e.type
            console.log('socket error at handleWs:', msg)
         }
         // handle the hot-socket close event
         hotSocket.onclose = (ev: CloseEvent) => {
            const { code, reason, wasClean } = ev;
            console.log(`Browser was closed! code: ${code}, reason: ${reason} wasClean? ${wasClean}`);
         };
         return response
      }

      // detect request for index.html as we'll need to
      // inject a Hot-Reload script into it.
      let isIndexHtml = false
      if (pathname.endsWith("/")) {
         isIndexHtml = true
         pathname += "index.html";
      }

      // modify our path based on our target folder
      const fullPath = (targetFolder.length > 0)
         ? join(Deno.cwd(), targetFolder, pathname)
         : join(Deno.cwd(), pathname);

      if (DEV) console.log(`fullPath = ${fullPath}`)

      try {
         // We intercept the index.html request so that we can
         // inject our hot-refresh service script into it.
         if (isIndexHtml) {
            // inject our hot refresh script
            const body = await inject(fullPath)
            // create appropriate headers    
            const headers = new Headers()
            headers.set("content-type", "text/html; charset=utf-8")
            // don't cache this - we expect frequent dev changes
            headers.append("Cache-Control", "no-store")
            return new Response(body, { status: 200, headers });
         } else { // a file request other than index.html
            // find the file and return it in the response
            const responce = await serveFile(request, fullPath)
            responce.headers.append("Cache-Control", "no-store")
            return responce
         }
      } catch (e) {
         console.error(e.message)
         return await Promise.resolve(new Response(
            "Internal server error: " + e.message, { status: 500 }
         ))
      }
})

// launch the browser with our index.html page
openWebsite(`http://localhost:${port}`)

if (DEV) console.log(`CFG.WatchFolders: ', ${CFG.WatchFolders}, type = ${typeof CFG.WatchFolders}`)

// Watch for file changes in selected folders
const fileWatch = Deno.watchFs(CFG.WatchFolders);

// handles all file changes for Hot refresh
const handleFileChange = debounce(
   (event: Deno.FsEvent) => {
      const { kind, paths } = event
      const path = paths[0]
      if (DEV) console.log(`Handling file change: [${kind}]    ${path}`)

      // src changed? -- build and bundle
      if (path.includes('src')) {
         if (DEV) console.log('esBuild Started!')
         build().then(() => {
            if (DEV) console.log('Built bundle.js!')
         }).catch((err) => {
            console.info('build err - ', err)
         })
      }
      // web app changed (.js, .css or .html has changed)
      else {
         // trigger Hot action
         const action = (path.endsWith("css"))
            ? 'refreshcss'
            : 'reload';
         if (DEV) console.log(`Action[${action}]  sent to client!`)
         if (hotSocket && hotSocket.readyState === 1) { // 1 = open
            hotSocket.send(action)
         }
      }
   }, 400,
);

// We'll do an initial build, just in case any files
// were changed prior to Hot start
if (DEV) console.log('Initial build started!')
build().then(() => {
   if (DEV) console.log('Built bundle.js!')
}).catch((err) => {
   if (DEV) console.info('build err - ', err)
})

// finally, we watch and handle any file change events
for await (const event of fileWatch) {
   handleFileChange(event)
}
