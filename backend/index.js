import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Groq from 'groq-sdk'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const chatHistory = []

app.post('/api/chat', async (req, res) => {
  const { message } = req.body

  chatHistory.push({
    role: 'user',
    content: message
  })

  const completion = await groq.chat.completions.create({
    messages: chatHistory,
    model: 'llama-3.3-70b-versatile',
  })

  const reply = completion.choices[0].message.content

  chatHistory.push({
    role: 'assistant',
    content: reply
  })

  res.json({ reply })
})

app.listen(5000, () => {
  console.log('Backend running on port 5000')
})

