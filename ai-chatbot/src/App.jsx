import { useState } from "react"
import axios from "axios"
import "./App.css"

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { role: "user", text: input }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await axios.post("https://ai-chatbot-backend-rejj.onrender.com", {
        message: input
      })
      const botMessage = { role: "bot", text: response.data.reply }
      setMessages(prev => [...prev, botMessage])
    } catch {
      const errorMessage = { role: "bot", text: "Something went wrong. Please try again." }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage()
  }

  return (
    <div className="app">
      <div className="header">
        <h1>AI Assistant</h1>
        <p>Powered by Gemini</p>
      </div>
      <div className="chat-window">
        {messages.length === 0 && (
          <div className="empty-state">
            <h2>How can I help you today?</h2>
          </div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <div className="bubble">{msg.text}</div>
          </div>
        ))}
        {loading && (
          <div className="message bot">
            <div className="bubble typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default App
