import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    profilePic: {
      type: String, // URL from Cloudinary
      default: "",
    },
    // We can add more fields here later, like 'onlineStatus', etc.
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// --- Mongoose Middleware to Hash Password ---
// This function will run "pre" (before) a document is "save"d
userSchema.pre("save", async function (next) {
  // 'this' refers to the user document about to be saved

  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// --- Mongoose Method to Compare Passwords ---
// We add a custom method 'comparePassword' to our user schema
userSchema.methods.comparePassword = async function (enteredPassword) {
  // 'this.password' refers to the hashed password stored in the database
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create the model from the schema
const User = mongoose.model("User", userSchema);

export default User;
