import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  createGroupChat,
  getOrCreateConversation,
  getMyConversations,
  leaveGroup,
} from "../controllers/conversation.controller.js";

const router = express.Router();

// All routes here will be prefixed with /api/conversations
// GET /api/conversations
// Gets all of the logged-in user's conversations
router.get("/", protectRoute, getMyConversations);

// POST /api/conversations/group
// Route to create a new group chat
router.post("/group", protectRoute, createGroupChat);

// POST /api/conversations/find/:id
// Finds or creates a 1-on-1 chat with user :id
router.post("/find/:id", protectRoute, getOrCreateConversation);

// PUT /api/conversations/leave/:id
// Route for a user to leave a group
router.put("/leave/:id", protectRoute, leaveGroup);

export default router;
