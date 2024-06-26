import React, { useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firbase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const currentUser = useContext(AuthContext);

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.currentUser.uid > user.uid
        ? currentUser.currentUser.uid + user.uid
        :  user.uid +currentUser.currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        //create user chats
        
        await updateDoc(doc(db, "userChats", currentUser.currentUser.uid), {
          [combinedId ]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        }
      );
        
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId ]: {
            uid: currentUser.currentUser.uid,
            displayName: currentUser.currentUser.displayName,
            photoURL: currentUser.currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        
      }
    } catch (err) {}
    setUser(null);
    setUsername("");
  };

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(err);
    }
  };

  const handleKey = (e) => {
    e.code == "Enter" && handleSearch();
  };
  return (
    <div className="search">
      <div className="searchInfo">
        <input
          type="text"
          placeholder="Search Username"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && (
        <div>
          <span> hiiii </span>
        </div>
      )}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="DP" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
