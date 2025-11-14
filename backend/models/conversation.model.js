import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // References the 'User' model
        required: true,
      },
    ],
    // 'isGroupChat' will determine if we show a group name or the other user's name
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    groupName: {
      type: String,
      trim: true,
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // We store the last message to quickly preview it in the chat list
    lastMessage: {
      text: String,
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      sentAt: { type: Date, default: Date.now },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
