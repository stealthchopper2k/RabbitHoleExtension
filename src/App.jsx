import React, { useEffect, useState } from "react";
import axios, {isCancel, AxiosError} from 'axios';
import "./styles.css";

export default function App() {
  const [user, setUser] = useState({})

  const handleLogin = () => {
    chrome.tabs.create({url: 'http://localhost:3000/auth/google', selected:true, active:true})
  }

  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout").then(response => console.log(response))
  }

  useEffect(() => {
    axios.get("http://localhost:3000/auth/me").then((res) => {
      console.log(res.data)
      setUser(res.data)
    })
  },[])
  
  return (
      <div className="flex p-10">
      <h1 className="text-3xl">RabbitHole</h1>
      <div className="flex justify-center items-center">
        {user ? <button className="py-4 px-3 bg-green-500 text-white m-2" onClick={handleLogout}>
          Logout
        </button> :
          <button className="py-4 px-3 bg-green-500 text-white m-2" onClick={handleLogin}>Login with Google</button>}
        </div>
      </div>
  );
}


