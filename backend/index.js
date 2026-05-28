import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { GoogleGenerativeAI } from '@google/generative-ai'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

const chatHistory = []

app.post('/api/chat', async (req, res) => {
  const { message } = req.body

  chatHistory.push({
    role: 'user',
    parts: [{ text: message }]
  })

  const chat = model.startChat({ history: chatHistory })
  const result = await chat.sendMessage(message)
  const reply = result.response.text()

  chatHistory.push({
    role: 'model',
    parts: [{ text: reply }]
  })

  res.json({ reply })
})

app.listen(5000, () => {
  console.log('Backend running on port 5000')
})
