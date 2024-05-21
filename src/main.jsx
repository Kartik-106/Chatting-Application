import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AutoContextProvider } from './context/AuthContext.jsx'
import { ChatContextProvider } from './context/ChatContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <AutoContextProvider>
    <ChatContextProvider>
    <React.StrictMode>
    <App />
  </React.StrictMode>
    </ChatContextProvider>
  </AutoContextProvider>
)
