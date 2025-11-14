import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messageType: {
      type: String,
      enum: ["text", "image"], // Message can only be 'text' or 'image'
      required: true,
    },
    content: {
      type: String, // For text messages or image URL
      required: true,
      trim: true,
    },
    // 'readBy' will store an array of user IDs who have read the message
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt (for message sent time) and updatedAt
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
