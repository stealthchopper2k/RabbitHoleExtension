/*global chrome*/
import React, { useEffect, useState } from 'react';
import { signIn } from './login.js';
import { getData } from './history.js';
import './styles.css';

export default function App() {
  const [userSignedIn, setUserSignedIn] = useState(false)
  
  return (
      <div className="flex p-10">
      <h1 className="text-3xl">RabbitHole</h1>
      <button onClick={(e) => {
        signIn(e)
      }}>Google Sign in</button>
    </div>
  );
}
