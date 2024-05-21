import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firbase';

const login = () => {
  const [err, SetErr] = useState(false);
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    } catch (err) {
      SetErr(true);
      console.log(err)
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <div className="Logo">Héy Lattéé</div>
        <div className="title">Sign In</div>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Enter password" />

          <button>Sign In</button>
          {err && <span>Something went wrong!</span>}
          <p>Don't have an acoount? <Link to="/register" >Register</Link> </p>
        </form>
      </div>
    </div>
  )
}

export default login