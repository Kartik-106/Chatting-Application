import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firbase'
import { AuthContext } from '../context/AuthContext'
const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className='navbar'>
        <span className="logo">Héy Lattéé</span>
        <div className="user">
            <img src={currentUser.photoURL} alt="" />
            <span>{currentUser.displayName}</span>
            <button onClick={()=>signOut(auth)}>Log Out</button>
        </div>
    </div>
  )
}

export default Navbar