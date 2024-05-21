import { ImageUp, Paperclip, Send } from "lucide-react";
import React, { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firbase";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
const Input = () => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage,uuid());
      const uploadTask = uploadBytesResumable(storageRef,img);

      uploadTask.on(
        (error) => {
          SetErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatid), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img:downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatid), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.chatid + ".lastMessage"]:{
        text
      },
      [data.chatid + ".date"]:serverTimestamp(),
    })

    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatid + ".lastMessage"]:{
        text
      },
      [data.chatid + ".date"]:serverTimestamp(),
    })
    setText("")
    setImg(null)
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Enter something...."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send" >
        
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
        <Paperclip />
        </label>
        <button onClick={handleSend}>
          <Send />
        </button>
      </div>
    </div>
  );
};

export default Input;
