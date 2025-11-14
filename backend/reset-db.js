import mongoose from "mongoose";
import dotenv from "dotenv";
import readline from "readline";

// Import your models
import User from "./models/user.model.js";
import Conversation from "./models/conversation.model.js";
import Message from "./models/message.model.js";

// Load environment variables
dotenv.config();

// Create a readline interface for user confirmation
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Main function to wipe the database.
 */
const resetDatabase = async () => {
  try {
    // 1. Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected.");

    // 2. Wipe the collections
    console.log("Wiping collections...");

    const userResult = await User.deleteMany({});
    console.log(`- Deleted ${userResult.deletedCount} users.`);

    const convoResult = await Conversation.deleteMany({});
    console.log(`- Deleted ${convoResult.deletedCount} conversations.`);

    const msgResult = await Message.deleteMany({});
    console.log(`- Deleted ${msgResult.deletedCount} messages.`);

    console.log("\n✅ Database has been completely wiped.");
  } catch (error) {
    console.error("Error during database reset:", error.message);
    process.exit(1); // Exit with a failure code
  } finally {
    // 3. Disconnect
    await mongoose.disconnect();
    console.log("MongoDB Disconnected.");
    process.exit(0); // Exit successfully
  }
};

// --- Confirmation Prompt ---
console.log("-------------------------------------------------");
console.log("⚠️  WARNING: This is a destructive action! ⚠️");
console.log("This script will delete ALL users, conversations,");
console.log("and messages from the database.");
console.log("-------------------------------------------------");

rl.question(
  "Are you sure you want to proceed? (Type 'yes' to confirm): ",
  (answer) => {
    if (answer.toLowerCase() === "yes") {
      resetDatabase();
    } else {
      console.log("Database reset cancelled.");
      process.exit(0);
    }
    rl.close();
  }
);
