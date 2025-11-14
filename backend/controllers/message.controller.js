import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
// --- Import socket helpers ---
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";

/**
 * Controller for sending a message.
 */
// export const sendMessage = async (req, res) => {
//   try {
//     const { message, messageType = "text" } = req.body;
//     const { id: receiverId } = req.params; // Receiver's ID from URL param
//     const senderId = req.user._id; // Sender's ID from protected route

//     // --- 1. Find or create a conversation ---
//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//       isGroupChat: false,
//     });

//     if (!conversation) {
//       conversation = new Conversation({
//         participants: [senderId, receiverId],
//       });
//       // No await here, will be saved in Promise.all
//     }

//     // --- 2. Create the new message ---
//     const newMessage = new Message({
//       conversationId: conversation._id,
//       senderId: senderId,
//       messageType: messageType,
//       content: message,
//       readBy: [senderId],
//     });

//     // --- 3. Update conversation with the last message ---
//     conversation.lastMessage = {
//       text: messageType === "text" ? message : "Image",
//       sender: senderId,
//       sentAt: newMessage.createdAt,
//     };

//     // --- 4. Save message and conversation (in parallel) ---
//     await Promise.all([conversation.save(), newMessage.save()]);

//     // --- 5. SOCKET.IO REAL-TIME LOGIC ---
//     const receiverSocketId = getReceiverSocketId(receiverId);
//     if (receiverSocketId) {
//       // Send the 'newMessage' event only to the specific receiver
//       io.to(receiverSocketId).emit("newMessage", newMessage);
//     }

//     // --- 6. Send response ---
//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.error("Error in sendMessage:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

/**
 * Controller for sending a message. (Refactored for groups)
 */
export const sendMessage = async (req, res) => {
  try {
    const { message, messageType = "text" } = req.body;
    const { id: conversationId } = req.params; // This is now CONVERSATION ID
    const senderId = req.user._id;

    // 1. Find the conversation
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found." });
    }

    // 2. Check if sender is a participant
    if (!conversation.participants.includes(senderId)) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    // 3. Create the new message
    const newMessage = new Message({
      conversationId: conversationId,
      senderId: senderId,
      messageType: messageType,
      content: message,
      readBy: [senderId],
    });

    // 4. Update conversation with the last message
    conversation.lastMessage = {
      text: messageType === "text" ? message : "Image",
      sender: senderId,
      sentAt: newMessage.createdAt,
    };

    // 5. Save in parallel
    await Promise.all([newMessage.save(), conversation.save()]);

    // 6. SOCKET.IO REAL-TIME LOGIC
    // Emit to all participants *except* the sender
    conversation.participants.forEach((participantId) => {
      if (participantId.toString() !== senderId.toString()) {
        const receiverSocketId = getReceiverSocketId(participantId.toString());
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", newMessage);
        }
      }
    });

    // 7. Send response
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Controller for sending an image message.
 * This runs *after* the 'upload' middleware.
 */
// export const sendImageMessage = async (req, res) => {
//   try {
//     const { id: receiverId } = req.params; // Receiver's ID
//     const senderId = req.user._id; // Sender's ID

//     // 1. Get the image URL from Cloudinary (provided by Multer)
//     if (!req.file) {
//       return res.status(400).json({ error: "No image file provided." });
//     }
//     const imageUrl = req.file.path; // This is the secure URL from Cloudinary

//     // 2. Find or create a conversation
//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//       isGroupChat: false,
//     });

//     if (!conversation) {
//       conversation = new Conversation({
//         participants: [senderId, receiverId],
//       });
//     }

//     // 3. Create the new image message
//     const newMessage = new Message({
//       conversationId: conversation._id,
//       senderId: senderId,
//       messageType: "image", // Set message type to "image"
//       content: imageUrl, // Store the Cloudinary URL
//       readBy: [senderId],
//     });

//     // 4. Update conversation with the last message
//     conversation.lastMessage = {
//       text: "Image", // Set last message preview text
//       sender: senderId,
//       sentAt: newMessage.createdAt,
//     };

//     // 5. Save message and conversation in parallel
//     await Promise.all([conversation.save(), newMessage.save()]);

//     // 6. SOCKET.IO REAL-TIME LOGIC
//     const receiverSocketId = getReceiverSocketId(receiverId);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("newMessage", newMessage);
//     }

//     // 7. Send response
//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.error("Error in sendImageMessage:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

/**
 * Controller for sending an image message. (Refactored for groups)
 */
export const sendImageMessage = async (req, res) => {
  try {
    const { id: conversationId } = req.params;
    const senderId = req.user._id;

    if (!req.file) {
      return res.status(400).json({ error: "No image file provided." });
    }
    const imageUrl = req.file.path;

    // 1. Find conversation
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found." });
    }

    // 2. Check participation
    if (!conversation.participants.includes(senderId)) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    // 3. Create message
    const newMessage = new Message({
      conversationId: conversationId,
      senderId: senderId,
      messageType: "image",
      content: imageUrl,
      readBy: [senderId],
    });

    // 4. Update last message
    conversation.lastMessage = {
      text: "Image",
      sender: senderId,
      sentAt: newMessage.createdAt,
    };

    // 5. Save
    await Promise.all([newMessage.save(), conversation.save()]);

    // 6. SOCKET.IO
    conversation.participants.forEach((participantId) => {
      if (participantId.toString() !== senderId.toString()) {
        const receiverSocketId = getReceiverSocketId(participantId.toString());
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", newMessage);
        }
      }
    });

    // 7. Send response
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendImageMessage:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Controller for getting messages for a specific conversation.
 */
// export const getMessages = async (req, res) => {
//   try {
//     const { id: userToChatId } = req.params; // The ID of the user we are chatting with
//     const senderId = req.user._id;

//     // --- 1. Find the conversation ---
//     const conversation = await Conversation.findOne({
//       participants: { $all: [senderId, userToChatId] },
//       isGroupChat: false,
//     });

//     if (!conversation) {
//       // No conversation yet, return empty array
//       return res.status(200).json([]);
//     }

//     // --- 2. Find all messages for this conversation ---
//     const messages = await Message.find({
//       conversationId: conversation._id,
//     }).sort({ createdAt: 1 }); // Sort by creation time (oldest first)

//     res.status(200).json(messages);
//   } catch (error) {
//     console.error("Error in getMessages:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

/**
 * Controller for getting messages for a specific conversation.
 * (Refactored to use Conversation ID)
 */
export const getMessages = async (req, res) => {
  try {
    const { id: conversationId } = req.params;
    const senderId = req.user._id;

    // 1. Find the conversation
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found." });
    }

    // 2. Check if user is part of it
    if (!conversation.participants.includes(senderId)) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    // 3. Find all messages for this conversation
    const messages = await Message.find({
      conversationId: conversationId,
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Controller for deleting a message.
 */
export const deleteMessage = async (req, res) => {
  try {
    const { id: messageId } = req.params; // The ID of the message to delete
    const userId = req.user._id; // The ID of the user making the request

    // 1. Find the message
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: "Message not found." });
    }

    // 2. Check ownership
    if (message.senderId.toString() !== userId.toString()) {
      return res.status(401).json({
        error: "Unauthorized: You can only delete your own messages.",
      });
    }

    // 3. Delete the message
    await Message.findByIdAndDelete(messageId);

    // 4. Check if this was the last message in the conversation and update
    const conversation = await Conversation.findById(message.conversationId);
    if (conversation) {
      // Find the *new* last message by sorting
      const newLastMessage = await Message.findOne({
        conversationId: message.conversationId,
      }).sort({ createdAt: -1 }); // Get the most recent one

      if (newLastMessage) {
        // Update conversation with the new last message
        conversation.lastMessage = {
          text:
            newLastMessage.messageType === "text"
              ? newLastMessage.content
              : "Image",
          sender: newLastMessage.senderId,
          sentAt: newLastMessage.createdAt,
        };
      } else {
        // No messages left, clear the lastMessage
        conversation.lastMessage = {
          text: "",
          sender: null,
          sentAt: null,
        };
      }
      await conversation.save();
    }

    // 5. Emit socket event to the other participant
    const otherParticipant = conversation.participants.find(
      (p) => p.toString() !== userId.toString()
    );

    if (otherParticipant) {
      const receiverSocketId = getReceiverSocketId(otherParticipant.toString());
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("messageDeleted", {
          messageId: messageId,
          conversationId: conversation._id,
        });
      }
    }

    res.status(200).json({ message: "Message deleted successfully." });
  } catch (error) {
    console.error("Error in deleteMessage:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Controller for clearing all messages in a 1-on-1 chat.
 * This is destructive and clears for *both* users.
 */
export const clearChatHistory = async (req, res) => {
  try {
    const { id: conversationId } = req.params;
    const userId = req.user._id;

    // 1. Find the conversation
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found." });
    }

    // 2. Check if it's a 1-on-1 chat and user is a participant
    if (conversation.isGroupChat) {
      return res
        .status(400)
        .json({ error: "This action is only for 1-on-1 chats." });
    }
    if (!conversation.participants.includes(userId)) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    // 3. Delete all messages for this conversation
    await Message.deleteMany({ conversationId: conversationId });

    // 4. Clear the lastMessage from the conversation
    conversation.lastMessage = {
      text: "",
      sender: null,
      sentAt: null,
    };
    await conversation.save();

    // 5. Emit socket event to the other participant
    const otherParticipant = conversation.participants.find(
      (p) => !p.equals(userId)
    );
    if (otherParticipant) {
      const socketId = getReceiverSocketId(otherParticipant.toString());
      if (socketId) {
        io.to(socketId).emit("chatCleared", { conversationId });
      }
    }

    res.status(200).json({ message: "Chat history cleared." });
  } catch (error) {
    console.error("Error in clearChatHistory:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
