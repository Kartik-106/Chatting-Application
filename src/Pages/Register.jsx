import React, { useState } from "react";
import "../style.scss";
import { ImageUp } from "lucide-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firbase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
  const [err, SetErr] = useState(false);
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          SetErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            })
            await setDoc(doc(db,"users",res.user.uid),{
              uid:res.user.uid,
              displayName,
              email,
              photoURL:downloadURL,
            })

            await setDoc(doc(db,"userChats",res.user.uid),{})
            navigate("/")
          });
        }
      );
      
    } catch (err) {
      SetErr(true);
      console.log(err);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <div className="Logo">Héy Lattéé</div>
        <div className="title">Register</div>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="E-mail" />
          <input type="password" placeholder="Enter password" />
          <input
            style={{ display: "none" }}
            type="file"
            id="FileUpload"
            placeholder="choose avatar"
          />
          <label htmlFor="FileUpload">
            <ImageUp />
            choose avatar
          </label>
          <button>Sign Up</button>
          {err && <span>Something went wrong!</span>}
        </form>
        <p>you already have an acoount? <Link to="/login" >login</Link></p>
      </div>
    </div>
  );
};

export default Register;
