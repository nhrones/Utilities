
import { SignalConnection } from './anotherSignaller.ts'
export const DEBUG = (Deno.env.get("DEBUG") === "true") || true
if (DEBUG) console.log(`Serving Websockets`);
export const connections: Set<SignalConnection> = new Set()

// Serves HTTP requests with the given handler
Deno.serve((request: Request):Promise<Response> => {
    try {
        if (request.headers.get("upgrade") === "websocket") {
                const { socket, response } = Deno.upgradeWebSocket(request);
                connections.add( new SignalConnection(socket, request) )  
                if (DEBUG) console.log(`connection in Region localhost - connections: ${connections.size}`)
                return Promise.resolve(response);
        }
        const errMsg = `Error: Request was not a valid WebSocket request! (405)`
        console.error(errMsg)
        return Promise.resolve(new Response(errMsg, { status: 405 }))
    } catch (err: unknown) {
        const errMsg = `Internal server error! 
    ${JSON.stringify(err)}`
        console.error(errMsg)
        return Promise.resolve(new Response(errMsg, { status: 500 }))
    }
})
