// src/App.jsx
import { useEffect, useRef, useState } from 'react'
import { ytext, webrtcProvider } from './editor'
import './styles.css'

function App() {
  const textareaRef = useRef(null)
  const [peers, setPeers] = useState(0)


  useEffect(() => {
    const textarea = textareaRef.current
    textarea.value = ytext.toString()

    const update = () => {
      const current = textarea.value
      if (current !== ytext.toString()) {
        ytext.delete(0, ytext.length)
        ytext.insert(0, current)
      }
    }

    const observer = () => {
      textarea.value = ytext.toString()
    }

    ytext.observe(observer)
    textarea.addEventListener('input', update)

    return () => {
      ytext.unobserve(observer)
      textarea.removeEventListener('input', update)
    }
  }, [])

  // ✅ CORRECT AWARENESS-BASED PEER COUNT
  useEffect(() => {
    const awareness = webrtcProvider.awareness

    const updatePeers = () => {
      const states = Array.from(awareness.getStates().keys())
      setPeers(Math.max(0, states.length - 1)) // subtract self
    }

    awareness.on('change', updatePeers)
    updatePeers()

    return () => {
      awareness.off('change', updatePeers)
    }
  }, [])

  return (
    <div className="container">
      <h1>📝 SyncPad</h1>
      <p className="subtitle">Offline-first P2P Notes using CRDT + WebRTC</p>
      <div className="status">
        <span className={peers > 0 ? 'online' : 'offline'}>
          ● {peers > 0 ? `Connected to ${peers} peer(s)` : 'No peers connected'}
        </span>
      </div>
      <textarea
        ref={textareaRef}
        className="editor"
        placeholder="Start typing here..."
        rows={15}
      />
    </div>
  )
}

export default App