import multer from "multer";
import CStorage from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// The default import *is* the class. Assign it to the CloudinaryStorage variable.
const CloudinaryStorage = CStorage;

// --- Storage for CHAT IMAGES (uploads directly to Cloudinary) ---
const chatImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "flux-chat-app",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    public_id: (req, file) => {
      const timestamp = Date.now();
      const originalName = file.originalname.split(".").slice(0, -1).join(".");
      return `${originalName}-${timestamp}`;
    },
  },
});

export const uploadChatImage = multer({ storage: chatImageStorage });

// --- Storage for PROFILE PICTURES (uploads to memory buffer) ---
// We use memoryStorage to get the file as a buffer
// This lets our controller handle the Cloudinary upload
const profilePicStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Accept only image formats
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload an image.", 400), false);
  }
};

export const uploadProfilePic = multer({
  storage: profilePicStorage,
  fileFilter: fileFilter,
});
