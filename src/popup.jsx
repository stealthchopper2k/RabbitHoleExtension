import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { NextUIProvider } from "@nextui-org/react";
import "./styles.css";

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
    <NextUIProvider>
        <App />
    </NextUIProvider>
);
