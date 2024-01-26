
/* ==============================================
 * From my old WebRTC-WS signaller 
 ================================================*/

/* 
WebRTC Signalling
  There are three basic types of information that need to be exchanged during signaling:
  1. Control messages used to set up, open, and close the communication channel, and handle errors.
  2. Information needed in order to set up the connection: the IP addressing and port information 
     needed for the peers to be able to talk to one another.   
  3. Media capability negotiation: what codecs and media data formats can the peers understand? 
     These need to be agreed upon before the WebRTC session can begin.   
  4. Only once signaling has been successfully completed can the true process of opening the WebRTC peer connection begin.

  This signaling service does not need to understand or do anything with the data being exchanged.
  */

/** 
 * collection of WebSocket signal-clients 
 */
const clients: Map<string, Client> = new Map();

/** 
 * Registers a new socket-client.    
 * Handles all socket events and messaging.
 * 
 * NOTE: This service does not actually need to understand 
 *  or do anything with the data being exchanged through it.
 *
 * @param { WebSocket }  socket - WebSocket connection
 * @param { string | null }  id - request.headers.get('sec-websocket-key')
 */
export const registerClient = (socket: WebSocket, id: string | null) => {

   const thisID = id ?? "0";

   // create a new client
   const client: Client = {
      id: thisID,
      isAlive: true,
      socket: socket,
   }
   // add new client to our collection
   clients.set(client.id, client)

   console.log(`Client: ${thisID} registered!`)

   // handle any socket errors
   socket.onerror = (e) => {
      const msg = (e instanceof ErrorEvent) ? e.message : e.type
      console.log('socket error at handleWs:', msg)
   }

   // handle the socket close event
   socket.onclose = (ev: CloseEvent) => {
      const { code, reason, wasClean } = ev;
      console.log(`Client: ${thisID} was closed! code: ${code}, reason: ${reason} wasClean? ${wasClean}`);
      clients.delete(thisID);
   };

   // handle all socket message events
   socket.onmessage = (message) => {
      console.log(`WS message from: ${thisID}, payload: ${message.data}`)
      /*
        Ensure that all message are passed through and delivered, 
        even if the server has no idea what they are.  
        Relay this message to the other client(s)
      */
      for (const client of clients.values()) {
         if (client.socket.readyState === 1) { // 1 = open
            if (client.id !== thisID) {   // skip me
               client.socket.send(message.data)
            }
         }
      }
   }
}

/** Signal Server Client type */
type Client = {
   id: string
   isAlive: boolean
   socket: WebSocket
}