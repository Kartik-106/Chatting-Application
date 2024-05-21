import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8lsgXWhBs3uGgqMnuNRVz67xHmn-4L-A",
  authDomain: "chatting-app-c2742.firebaseapp.com",
  projectId: "chatting-app-c2742",
  storageBucket: "chatting-app-c2742.appspot.com",
  messagingSenderId: "1059007870806",
  appId: "1:1059007870806:web:f09c781239325f62eac8f7",
  measurementId: "G-J8YKHVXKDM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
