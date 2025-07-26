import * as Y from 'yjs'
import { IndexeddbPersistence } from 'y-indexeddb'
import { WebrtcProvider } from 'y-webrtc'
import * as awarenessProtocol from 'y-protocols/awareness'

// Create Yjs document
export const ydoc = new Y.Doc()

// Local offline storage
const persistence = new IndexeddbPersistence('syncpad-doc', ydoc)

// Shared room name
export const roomName = 'syncpad-room-001'

// Set up WebRTC with fallback signaling servers
export const webrtcProvider = new WebrtcProvider(roomName, ydoc, {
  signaling: [
    'https://syncpadserver.onrender.com'
  ],
  password: null,
  awareness: new awarenessProtocol.Awareness(ydoc),
  maxConns: 20,
  filterBcConns: false
})

// Shared text object
export const ytext = ydoc.getText('shared-note')
