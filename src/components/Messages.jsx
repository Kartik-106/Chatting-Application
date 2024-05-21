import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firbase'
const Messages = () => {

  const {data} = useContext(ChatContext)
  const[messages,setMessages] = useState([])

  useEffect(()=>{
    const unSub = onSnapshot(doc(db,"chats",data.chatid),(doc)=>{
      doc.exists() && setMessages(doc.data().messages)
    })
    return()=>{
      unSub
    }
  },[data.chatid])
  return (
    <div className='messages'>
      {messages.map((m)=>(
        <Message messages={m} key={m.id}/>
      ))}
        
    </div>
  )
}

export default Messages