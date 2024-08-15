// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyBGO2Yud0RSQLiSxmMC13iKouNH3sEbzwk",
  authDomain: "blogging-5b1d7.firebaseapp.com",
  projectId: "blogging-5b1d7",
  storageBucket: "blogging-5b1d7.appspot.com",
  messagingSenderId: "172646437142",
  appId: "1:172646437142:web:52036739a104d8c0fd0037",
  measurementId: "G-2Y3MD5ED6T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)