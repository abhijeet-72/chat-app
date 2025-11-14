// import User from "../models/user.model.js";

// /**
//  * Controller to get all users except the currently logged-in user.
//  * Used for populating the sidebar for new chats.
//  */
// export const getUsersForSidebar = async (req, res) => {
//   try {
//     // Get the logged-in user's ID from the req.user object (added by protectRoute)
//     const loggedInUserId = req.user._id;

//     // Find all users ($ne: not equal)
//     // Exclude the password field
//     const allOtherUsers = await User.find({
//       _id: { $ne: loggedInUserId },
//     }).select("-password");

//     res.status(200).json(allOtherUsers);
//   } catch (error) {
//     console.error("Error in getUsersForSidebar:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";

/**
 * Controller to get all users except the currently logged-in user.
 * (Used for populating the sidebar for new chats)
 */
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const allOtherUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(allOtherUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Controller to update the logged-in user's profile.
 * (Username, Bio, Profile Picture)
 */
export const updateUserProfile = async (req, res) => {
  try {
    const { username, bio } = req.body;
    let profilePic = req.body.profilePic; // May be a new URL or undefined
    const userId = req.user._id;

    // 1. Handle Profile Picture Upload
    // If req.file exists, multer has processed an upload
    if (req.file) {
      // Upload to Cloudinary
      // We're using the 'upload_stream' since we're getting a buffer
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "flux-profile-pics",
            public_id: `${userId}_profile`, // Overwrite old pic
            overwrite: true,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });

      profilePic = uploadResult.secure_url;
    }

    // 2. Find and update the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // 3. Check for username uniqueness if it's being changed
    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Username is already taken." });
      }
      user.username = username;
    }

    // 4. Update other fields
    user.bio = bio || user.bio; // Update bio
    user.profilePic = profilePic || user.profilePic; // Update profile pic

    await user.save();

    // 5. Send back updated user (without password)
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      bio: user.bio,
    });
  } catch (error) {
    console.error("Error in updateUserProfile:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Controller to change the logged-in user's password.
 */
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user._id;

    // 1. Basic validation
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Please provide old and new passwords." });
    }
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters." });
    }

    // 2. Find user and check old password
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid old password." });
    }

    // 3. Hash and save new password
    // (Our pre-save hook in user.model.js will hash it)
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.error("Error in changePassword:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
