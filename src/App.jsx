import React, { useEffect, useState } from "react";
import axios from 'axios';
import { UserPrompt } from "./dropdown.jsx";
import Login from "./login.jsx";

export default function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    axios.get("http://localhost:3000/auth/me").then((res) => {
      setUser(res.data.user)
      console.log("fonky", res)
    })
  }, [])

  return (
    <div className="flex flex-col justify-center items-center w-full p-24">
      <h1 className="text-3xl">RabbitHole</h1>
      {(user && user.isNew != undefined && user.isNew) ? (
        <UserPrompt />
      ) : (
        <h3 className="whitespace-nowrap">Please Sign In</h3>
      )}
      <Login user={user} />
    </div>
  );
}


