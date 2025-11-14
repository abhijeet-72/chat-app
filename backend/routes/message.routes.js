import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  sendMessage,
  getMessages,
  sendImageMessage,
  deleteMessage,
  clearChatHistory,
} from "../controllers/message.controller.js";
// import upload from "../middleware/multer.middleware.js";
import { uploadChatImage } from "../middleware/multer.middleware.js";

const router = express.Router();

// --- ALL ROUTES NOW USE CONVERSATION ID ---

// Get messages for a conversation
// :id param is the CONVERSATION ID
// router.get("/:id", protectRoute, getMessages);
router.get("/convo/:id", protectRoute, getMessages);

// Send a TEXT message to a conversation
// :id param is the CONVERSATION ID
router.post("/send/:id", protectRoute, sendMessage);

// Send an IMAGE message
router.post(
  "/send/image/:id",
  protectRoute,
  uploadChatImage.single("image"), // <<< --- CHANGE THIS
  sendImageMessage
);

// :id param is the CONVERSATION ID
// router.post(
//   "/send/image/:id",
//   protectRoute,
//   upload.single("image"),
//   sendImageMessage
// );

// Delete a message
// :id param is the MESSAGE ID (this one was already correct)
router.delete("/:id", protectRoute, deleteMessage);

// DELETE /api/messages/clear/:id
// Clears all messages for a 1-on-1 conversation
router.delete("/clear/:id", protectRoute, clearChatHistory);

export default router;
