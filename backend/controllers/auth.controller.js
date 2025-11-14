import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

/**
 * Controller for user signup.
 */
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // --- Input Validation ---
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Please fill in all fields." });
    }

    // --- Check for existing user ---
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists." });
    }

    // --- Create new user ---
    // Note: Password hashing is handled by the 'pre-save' middleware in user.model.js
    const newUser = new User({
      username,
      email,
      password,
      // We'll set a default profile pic later or based on username
    });

    if (newUser) {
      // 1. Save user to database
      await newUser.save();

      // 2. Generate JWT and set cookie
      generateTokenAndSetCookie(newUser._id, res);

      // 3. Send response (excluding password)
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profilePic: newUser.profilePic,
        bio: newUser.bio,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Controller for user login.
 */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // --- Find user ---
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    // --- Check password ---
    // We use the custom 'comparePassword' method we added to the User model
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    // --- User is valid, generate token ---
    generateTokenAndSetCookie(user._id, res);

    // --- Send response ---
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      bio: user.bio,
    });
  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Controller for user logout.
 */
export const logout = (req, res) => {
  try {
    // Clear the JWT cookie by setting it to an empty string and expiring it
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
