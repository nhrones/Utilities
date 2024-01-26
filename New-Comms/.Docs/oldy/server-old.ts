
import { connectClient } from './signalService.ts'

/* ==============================================
 * From my old WebRTC signaller 
 ================================================*/

const host = "http://localhost"
const thisPort = 9093
// serve HTTP requests on incoming connections to handler
Deno.serve( { hostname: host, port: thisPort }, handleRequest );

// handle each new http WebSocket upgrade request
async function handleRequest(request: Request): Promise<Response> {
    try {
        console.info(request)
        const upgrade = request.headers.get("upgrade")?.toLowerCase() || "";
        // is this a websocket request? 
        if (upgrade === "websocket") {
            const { socket, response } = Deno.upgradeWebSocket(request);
            connectClient(socket, request.headers.get('sec-websocket-key'));
            return response
        }
        const errMsg = `Error: Request was not a valid WebSocket request! (405)`
        console.error(errMsg)
        return await Promise.resolve(new Response(errMsg, { status: 405 }))
    } catch (err: unknown) {
        const errMsg = `Internal server error! 
        ${JSON.stringify(err)}`
        console.error(errMsg)
        return await Promise.resolve(new Response(errMsg, { status: 500 }))
    }
}

console.log(`Serving WebSockets from http://${host}:${thisPort}`);