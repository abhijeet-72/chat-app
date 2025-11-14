import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

/**
 * Configures the Cloudinary SDK with credentials from environment variables.
 * This function is self-invoking.
 */
(() => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true, // Use HTTPS
    });
    console.log("Cloudinary configuration successful.");
  } catch (error) {
    console.error("Cloudinary configuration failed:", error.message);
    process.exit(1); // Exit if config fails
  }
})();

export default cloudinary;
