import jwt from "jsonwebtoken";

/**
 * Generates a JWT and sets it as an HTTP-Only cookie.
 * @param {string} userId - The MongoDB user ID to encode in the token.
 * @param {object} res - The Express response object.
 */
const generateTokenAndSetCookie = (userId, res) => {
  // 1. Create the token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d", // Token expires in 15 days
  });

  // 2. Set the token as an HTTP-Only cookie
  res.cookie("jwt", token, {
    httpOnly: true, // Prevents XSS attacks (cookie cannot be accessed by client-side JS)
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production (HTTPS)
    sameSite: "none", // <<< --- THIS IS THE FIX (was "strict")
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
  });

  return token;
};

export default generateTokenAndSetCookie;
