import React, { useEffect, useState } from "react";
import { signIn } from "./login.js";
import "./styles.css";

export default function App() {
  const [userSignedIn, setUserSignedIn] = useState(false)
  
  return (
      <div className="flex p-10">
      <h1 className="text-3xl">RabbitHole</h1>
      <div className="bg-red p-8">
        <a href="/auth/google">Login With Google</a>
        </div>
      </div>
  );
}
