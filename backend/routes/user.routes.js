// import express from "express";
// import protectRoute from "../middleware/protectRoute.js";
// import { getUsersForSidebar } from "../controllers/user.controller.js";

// const router = express.Router();

// // All routes here will be prefixed with /api/users
// // This route is protected, so protectRoute middleware is called first
// router.get("/", protectRoute, getUsersForSidebar);

// export default router;

import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  getUsersForSidebar,
  updateUserProfile,
  changePassword,
} from "../controllers/user.controller.js";
import { uploadProfilePic } from "../middleware/multer.middleware.js";

const router = express.Router();

// --- GET Routes ---
router.get("/", protectRoute, getUsersForSidebar); // For sidebar

// --- PUT/PATCH Routes (for updates) ---

// Route to update profile (bio, username, pic)
// We use uploadProfilePic.single("profilePic") to get the file
router.put(
  "/profile",
  protectRoute,
  uploadProfilePic.single("profilePic"),
  updateUserProfile
);

// Route to change password
router.put("/password", protectRoute, changePassword);

export default router;
