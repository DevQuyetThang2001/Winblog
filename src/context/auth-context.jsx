import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase-config";

const AuthContex = createContext();

function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState({});
  const values = { userInfo, setUserInfo };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserInfo(user)
      console.log(user);
      
    })
  },[])


 
  return <AuthContex.Provider value={values} {...props}></AuthContex.Provider>;
}

function useAuth() {
  const context = useContext(AuthContex);
  if (typeof context === "undefined")
    throw new Error("UseAuth Must be used within AuthProvider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { useAuth, AuthProvider };
