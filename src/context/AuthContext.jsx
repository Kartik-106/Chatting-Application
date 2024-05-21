import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firbase";

export const AuthContext = createContext();

export const AutoContextProvider = ({ children }) => {
  const [currentUser, SetCurrentUser] = useState({});

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      SetCurrentUser(user);
      console.log(user);
    });
    return () => {
      unSub();
    };
  }, []);
  return (
    <AuthContext.Provider value={{currentUser}}>{children}</AuthContext.Provider>
    
  );
};
