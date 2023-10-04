import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { Button } from "@nextui-org/react";

export default function Login({ user }) {
    const handleLogin = () => {
        chrome.tabs.create({ url: 'http://localhost:3000/auth/google', selected: true, active: true })
    }

    const handleLogout = () => {
        axios.get("http://localhost:3000/auth/logout").then(response => window.location.reload())
    }

    return (
        <div>
            {(user && user.email) ? (<Button color="secondary" className="m-2" onClick={handleLogout}>
                Logout
            </Button>) :
                (
                    <>
                        <h3 className="whitespace-nowrap">Please Sign In</h3>
                        <Button color="secondary" className="m-2" onClick={handleLogin}>Login with Google</Button>
                    </>
                )
            }
        </div>
    )
}