# AI Assistant Chatbot
//live demo 
https://ai-chatbot-olive-nu.vercel.app/

A conversational AI chatbot that lets you have multi-turn conversations 
with Google Gemini. Built with React on the frontend and Node.js/Express 
on the backend.

## What it does
- Remembers previous messages in the conversation
- Shows a typing indicator while AI is thinking
- Handles errors gracefully
- Mobile responsive UI

## Tech Stack
Frontend — React.js, CSS
Backend — Node.js, Express.js
AI Model — Groq API 2(LLaMA 3.3 70B)
Deployment — Vercel + Render

## How to run locally

### Backend
cd backend
npm install
add your GEMINI_API_KEY in .env file
node index.js

### Frontend
cd ai-chatbot
npm install
npm run dev

## Why I built this
Wanted to understand how to integrate a real AI API into a 
full-stack application and handle multi-turn conversations 
with context retention.

