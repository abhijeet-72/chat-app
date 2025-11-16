import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

// --- Import Models ---
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

// --- App Initialization ---
const app = express();

// --- Server Creation ---
const server = http.createServer(app);

// --- Socket.IO Server Initialization ---

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const io = new Server(server, {
  cors: {
    origin: [FRONTEND_URL, "http://localhost:5173"], // <<< --- 1. MATCH THE SERVER
    methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
    credentials: true, // <<< --- 2. ADD CREDENTIALS
  },
});

// const io = new Server(server, {
//   cors: {
//     origin: "*", // Changed origin to wild card from - ["http://localhost:5173"], <-- The origin of your frontend app
//     methods: ["GET", "POST"],
//   },
// });

// --- User Socket Mapping ---
// This map stores { userId: socketId }
const userSocketMap = new Map();

/**
 * Gets the socket ID for a given receiver ID.
 * @param {string} receiverId - The MongoDB ID of the receiver.
 * @returns {string | undefined} The socket ID or undefined if not found.
 */
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap.get(receiverId);
};

// --- Socket.IO Connection Logic ---
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Get userId from the client (we'll implement this on the frontend)
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap.set(userId, socket.id);
    console.log(`User ${userId} mapped to socket ${socket.id}`);
  }

  // Emit 'getOnlineUsers' to all clients
  // This sends an array of userIds who are currently online
  io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));

  // --- Typing Indicator Logic ---
  socket.on("typing", ({ receiverId }) => {
    // Get the socket ID of the user we are typing to
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // Emit 'typing' only to that specific user
      // We use socket.to() to send to a specific socketId
      socket.to(receiverSocketId).emit("typing");
    }
  });

  socket.on("stopTyping", ({ receiverId }) => {
    // Get the socket ID of the user we are typing to
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // Emit 'stopTyping' only to that specific user
      socket.to(receiverSocketId).emit("stopTyping");
    }
  });

  // --- Mark Messages as Read Logic ---
  socket.on("markMessagesAsRead", async ({ otherUserId }) => {
    try {
      // Get the ID of the user who is emitting this event
      const currentUserId = socket.handshake.query.userId;
      if (!currentUserId) return;

      // 1. Find the conversation between the two users
      const conversation = await Conversation.findOne({
        participants: { $all: [currentUserId, otherUserId] },
        isGroupChat: false,
      });

      if (!conversation) return;

      // 2. Update all messages *sent by the other user* in this chat
      //    Add the current user's ID to the 'readBy' array
      await Message.updateMany(
        {
          conversationId: conversation._id,
          senderId: otherUserId, // Only messages sent by the *other* user
          readBy: { $ne: currentUserId }, // Where I am *not* already in readBy
        },
        {
          $addToSet: { readBy: currentUserId }, // Add my ID
        }
      );

      // 3. Emit an event to *both* users to let them know
      const receiverSocketId = getReceiverSocketId(otherUserId);
      if (receiverSocketId) {
        // Emit to the other user
        io.to(receiverSocketId).emit("messagesRead", {
          conversationId: conversation._id,
          readByUserId: currentUserId,
        });
      }
      // Emit back to the sender
      socket.emit("messagesRead", {
        conversationId: conversation._id,
        readByUserId: currentUserId,
      });
    } catch (error) {
      console.error("Error in markMessagesAsRead:", error.message);
    }
  });

  // --- Disconnect Logic ---
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    // Find the userId associated with this socketId
    let disconnectedUserId;
    for (let [key, value] of userSocketMap.entries()) {
      if (value === socket.id) {
        disconnectedUserId = key;
        break;
      }
    }

    // If a user was found, remove them from the map
    if (disconnectedUserId) {
      userSocketMap.delete(disconnectedUserId);
      console.log(`User ${disconnectedUserId} removed from map.`);
    }

    // Emit updated online users list to all clients
    io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
  });
});

export { app, io, server };
