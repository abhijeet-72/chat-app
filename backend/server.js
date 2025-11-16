// --- Imports ---
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// --- Custom Imports ---
import connectDB from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";
import { app, server } from "./socket/socket.js";
import cloudinaryConfig from "./config/cloudinary.js";

// --- App Initialization ---
dotenv.config();

// --- Constants ---
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// --- 2. CONFIGURE CORS OPTIONS ---
const corsOptions = {
  origin: [FRONTEND_URL, "http://localhost:5173"], // Allow both production and local dev
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // This is essential for sending cookies (like our JWT)
  optionsSuccessStatus: 204,
};

// --- Middleware ---
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions)); // <<< --- USED CORS MIDDLEWARE

// --- Test Route ---
app.get("/", (req, res) => {
  res.send("FLUX Server is Running!");
});

// --- API Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/conversations", conversationRoutes);

// --- Server & DB Connection ---
server.listen(PORT, () => {
  connectDB();
  console.log(`Server (with Socket.IO) is running on port ${PORT}`);
});
