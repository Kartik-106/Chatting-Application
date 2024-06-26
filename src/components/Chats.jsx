import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firbase";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
  const currentUser = useContext(AuthContext);
  const {dispatch} =useContext(ChatContext);
  const [chats, setChats] = useState({});
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "userChats", currentUser.currentUser.uid),
        (doc) => {
          setChats(doc.data());
        }
      );
      return () => {
        unsub();
      };
    };
    currentUser.currentUser.uid && getChats();
  }, [currentUser.currentUser.uid]);

  const handleSelect = (u)=>{
    dispatch({type:"CHANGE_USER",payload:u})
  }
  return (
    <div className="chats">
      {Object.entries(chats)?.map((chat) => (
        <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1])}>
        <img src={chat[1].photoURL} 
        alt="DP" />
        <div className="userChatInfo">
          <span>{chat[1].displayName}</span>
          <p>{chat[1].lastMessage?.text}</p>
        </div>
      </div>
      ))}
    </div>
  );
};

export default Chats;
