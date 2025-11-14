import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/**
 * Middleware to protect routes by verifying JWT.
 */
const protectRoute = async (req, res, next) => {
  try {
    // 1. Get token from cookies
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    // 3. Find user by ID (from token payload)
    // We exclude the password field
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 4. Attach user to the request object
    req.user = user;

    // 5. Call the next middleware or controller
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Unauthorized - Token Expired" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectRoute;
