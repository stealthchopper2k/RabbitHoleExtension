import React, { useEffect, useState } from "react";
import axios from 'axios';
import { UserPrompt } from "./dropdown.jsx";
import { BasePage } from "./BasePage.jsx"
import Login from "./login.jsx";

export default function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    axios.get("http://localhost:3000/auth/me").then((res) => {
      setUser(res.data)
      console.log("Response", res)
    }).catch((error) => {
      console.error("Error fetching user data:", error);
    });

  }, [])

  return (
    <div className="flex flex-col justify-center items-center w-full p-16">
      <h1 className="text-3xl mt-2 mb-2">RabbitHole</h1>
      {(user && !user.isNew && user.googleId) && (
        <BasePage user={user} />
      )}
      {(user && user.isNew != undefined && user.isNew) && (
        <UserPrompt user={user} updateUser={updateUser} />
      )}
      <Login user={user} />
    </div>
  );
}


