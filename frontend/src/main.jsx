import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";

// 1. Import the SocketProvider
import { SocketProvider } from "./context/SocketContext.jsx";

// --- SETTING THE LIVE BACKEND URL ---
axios.defaults.baseURL = "https://flux-app-lovy.onrender.com";
// axios.defaults.baseURL =
//   import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
axios.defaults.withCredentials = true; // To send/receive cookies

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </React.StrictMode>
);
