import mongoose from "mongoose";
import dotenv from "dotenv";

// Import your User model
import User from "./models/user.model.js";

// Load environment variables
dotenv.config();

/**
 * Main function to fetch and list all users.
 */
const listUsers = async () => {
  try {
    // 1. Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected.");

    // 2. Fetch all users
    // We select only the username, email, and createdAt (for date of joining)
    // We explicitly exclude the password and __v fields
    const users = await User.find(
      {},
      "username email createdAt bio profilePic"
    ).sort({ createdAt: 1 }); // Sort by oldest first

    console.log("\n--- 👥 All Registered Users ---");
    console.log(`Total users found: ${users.length}`);
    console.log("---------------------------------");

    if (users.length > 0) {
      // 3. Loop and display each user
      users.forEach((user, index) => {
        console.log(`\nUser #${index + 1}`);
        console.log(`  Username:   ${user.username}`);
        console.log(`  Email:      ${user.email}`);
        console.log(`  Bio:        ${user.bio || "N/A"}`);
        console.log(`  Profile Pic: ${user.profilePic || "N/A"}`);
        console.log(`  Joined:     ${user.createdAt.toDateString()}`); // Format date
      });
    } else {
      console.log("No users found in the database.");
    }
  } catch (error) {
    console.error("Error fetching user list:", error.message);
    process.exit(1); // Exit with a failure code
  } finally {
    // 4. Disconnect
    await mongoose.disconnect();
    console.log("\n---------------------------------");
    console.log("MongoDB Disconnected.");
    process.exit(0); // Exit successfully
  }
};

// Run the function
listUsers();
