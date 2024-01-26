import { DEBUG, connections } from './anotherServer.ts'

/**  
 * 
 *  A signalling class for WebSocket <-> BroadcastChannel 'message-coupling'.    
 * 
 *   WS.send ---------> BC.onmessage    
 *   WS.onmessage <--- BC.postMessage
*/
export class SignalConnection {

    id: string
    name: string
    table: number
    seat: number
    socket: WebSocket
    channel: BroadcastChannel

    constructor(socket: WebSocket, request: Request) {

        this.id = request.headers.get('sec-websocket-key') || 'id'
        this.name = ''
        this.table = 0
        this.seat = connections.size + 1
        this.channel = new BroadcastChannel('iso')
        this.socket = socket
        
        //
        //  recieve messages from other peers! relay them
        //
        this.channel.onmessage = (e: MessageEvent) => {
            if (DEBUG) console.info(`${this.seat} ${this.name}: Recived channel message >>  ${e.data}`)
            if (socket.readyState === WebSocket.OPEN) {
                if (DEBUG) console.info(`${this.seat} ${this.name}: sending socket message >>  ${e.data}`)
                socket.send(e.data);
            }
        }
        
        //
        //  capture any message data errors
        //
        this.channel.onmessageerror = (ev: MessageEvent) => {
            console.error('A BroadcastChannel message error occurred! data was: ', ev.data);
        }
         
        // 
        //  When ready, send this peer their own unique id, then detect
        //
        this.socket.onopen = () => {
            if (socket.readyState === WebSocket.OPEN) {
                // todo send id
            }
        }

        // 
        //  When this peer has closed the socket connection, 
        //  
        //  inform all peers and close the BroadcastChannel connection.
        //
        this.socket.onclose = (_ev: CloseEvent) => {
            const msg = `${this.name} >> has disconnected!`
            if (DEBUG) console.log(msg)
            this.channel.postMessage(msg)
            this.cleanUp()
        }

        // 
        //  We'll ensure that all signalling messages are passed through 
        // 
        //  and delivered, even if the server has no idea what they are.
        //          
        this.socket.onmessage = (msg) => {
            const data = msg.data
            if (DEBUG) console.log(`${this.seat} ${this.name} recieved socket message >> ${msg.data}`)

            if (typeof data === 'string') {
                // user registration request?
                if (data.startsWith('Register')) {
                    // get the users name from the data string('Register:John Doe')
                    this.name = data.split(":")[1]// the second value of split-array
                    if (DEBUG) console.log(`${this.seat} ${this.name} >> has joined the chat!`)
                    this.channel.postMessage(`${this.name} >> has joined the chat!`);
                } else {
                    if (DEBUG) console.log(`${this.seat} ${this.name} posting channel message >> ${msg.data}`)
                    this.channel.postMessage(`${this.name} >> ${msg.data}`)
                }
            }
        }

        // Report any errors
        this.socket.onerror = (ev: Event | ErrorEvent) => {
            if (ev instanceof ErrorEvent) {
                console.error('An error occurred:', ev.message);
            } else {
                console.error('socket error: code', ev.type);
            }
        }
    }
    
    cleanUp() {
        // remove socket listeners
        this.socket.onopen = null
        this.socket.onerror = null
        this.socket.onmessage = null
        this.socket.onclose = null
        // remove channel listeners
        this.channel.onmessage = null
        this.channel.onmessageerror = null
        // force close
        this.socket.close()
        // No leaks -- allow this instance to be GC'd
        connections.delete(this)
    }
}