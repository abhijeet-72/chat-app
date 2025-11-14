import Conversation from "../models/conversation.model.js";
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";

/**
 * Controller for creating a new group chat.
 */
export const createGroupChat = async (req, res) => {
  try {
    const { groupName, participants } = req.body; // participants = array of user IDs
    const creatorId = req.user._id; // The user creating the group

    // 1. Validate input
    if (!groupName || !participants || participants.length === 0) {
      return res.status(400).json({
        error: "Please provide a group name and at least one participant.",
      });
    }

    // A group must have at least 2 people (creator + 1 participant)
    if (participants.length < 1) {
      return res.status(400).json({
        error: "A group must have at least two participants.",
      });
    }

    // 2. Add creator to the participants list
    const allParticipants = [...participants, creatorId];

    // 3. Create the new group conversation
    const newGroup = new Conversation({
      isGroupChat: true,
      groupName: groupName,
      participants: allParticipants,
      groupAdmin: creatorId, // The creator is the admin
    });

    // 4. Save to DB
    await newGroup.save();

    // 5. Populate participant details (names, etc.) before sending back
    await newGroup.populate("participants", "-password");

    // TODO: We will emit a socket event here later to notify participants

    // --- SOCKET.IO: Notify all participants (except creator) ---
    newGroup.participants.forEach((participant) => {
      // Don't send to the creator
      if (participant._id.toString() !== creatorId.toString()) {
        const socketId = getReceiverSocketId(participant._id.toString());
        if (socketId) {
          // Send the full new group object to the participant
          io.to(socketId).emit("newGroupChat", newGroup);
        }
      }
    });

    res.status(201).json(newGroup);
  } catch (error) {
    console.error("Error in createGroupChat:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Finds an existing 1-on-1 conversation, or creates a new one.
 */
export const getOrCreateConversation = async (req, res) => {
  try {
    const { id: otherUserId } = req.params;
    const senderId = req.user._id;

    // 1. Find existing 1-on-1 conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, otherUserId] },
      isGroupChat: false,
    }).populate("participants", "-password"); // Populate for the client

    if (conversation) {
      // 2. If it exists, return it
      return res.status(200).json(conversation);
    }

    // 3. If not, create a new one
    conversation = new Conversation({
      participants: [senderId, otherUserId],
      isGroupChat: false,
    });
    await conversation.save();

    // 4. Populate and return the new conversation
    const newConvo = await Conversation.findById(conversation._id).populate(
      "participants",
      "-password"
    );

    res.status(201).json(newConvo);
  } catch (error) {
    console.error("Error in getOrCreateConversation:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Controller to get all of a user's conversations (1-on-1 and group).
 */
export const getMyConversations = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find all conversations the user is a part of
    const conversations = await Conversation.find({
      participants: userId,
    })
      .sort({ "lastMessage.sentAt": -1 }) // Sort by most recent message
      .populate("participants", "-password") // Get participant details
      .populate("groupAdmin", "-password") // Get admin details
      .populate("lastMessage.sender", "username profilePic"); // Get last msg sender details

    res.status(200).json(conversations);
  } catch (error) {
    console.error("Error in getMyConversations:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Controller for a user to leave a group chat.
 */
export const leaveGroup = async (req, res) => {
  try {
    const { id: conversationId } = req.params;
    const userId = req.user._id;

    // 1. Find the conversation
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found." });
    }
    if (!conversation.isGroupChat) {
      return res.status(400).json({ error: "This is not a group chat." });
    }

    // 2. Check if user is a participant
    if (!conversation.participants.includes(userId)) {
      return res
        .status(400)
        .json({ error: "You are not a participant in this group." });
    }

    // 3. Remove the user from participants
    conversation.participants = conversation.participants.filter(
      (p) => !p.equals(userId)
    );

    // 4. Handle Admin logic
    if (conversation.groupAdmin.equals(userId)) {
      // If the admin leaves, assign a new admin
      if (conversation.participants.length > 0) {
        conversation.groupAdmin = conversation.participants[0]; // Assign to the next person
      } else {
        // If they were the last person, the group will be empty
        // We could delete the group, but for now, we'll just leave it admin-less
        conversation.groupAdmin = null;
      }
    }

    // 5. Add a "User left" system message (optional, but good)
    const systemMessage = new Message({
      conversationId: conversationId,
      senderId: null, // No sender for system messages
      messageType: "text",
      content: `${req.user.username} has left the group.`,
    });
    conversation.lastMessage = {
      text: systemMessage.content,
      sender: null,
      sentAt: systemMessage.createdAt,
    };

    await Promise.all([systemMessage.save(), conversation.save()]);

    // 6. Emit socket event to remaining participants
    conversation.participants.forEach((participantId) => {
      const socketId = getReceiverSocketId(participantId.toString());
      if (socketId) {
        io.to(socketId).emit("userLeftGroup", { conversationId, userId });
      }
    });

    res.status(200).json({ message: "Successfully left the group." });
  } catch (error) {
    console.error("Error in leaveGroup:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
