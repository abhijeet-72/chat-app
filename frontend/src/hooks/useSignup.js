import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthStore();

  const signup = async ({ username, email, password, confirmPassword }) => {
    // 1. Validation
    const success = handleInputErrors({
      username,
      email,
      password,
      confirmPassword,
    });
    if (!success) return;

    setLoading(true);
    try {
      // 2. API Call (using the proxy)
      const res = await axios.post("/api/auth/signup", {
        username,
        email,
        password,
      });

      const data = res.data;

      // 3. Save user to Zustand store and localStorage
      setAuthUser(data);
      toast.success("Account created successfully!");

      // Note: We will be automatically redirected to /chat by App.jsx
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "An error occurred during signup.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

// --- Helper Validation Function ---
function handleInputErrors({ username, email, password, confirmPassword }) {
  if (!username || !email || !password || !confirmPassword) {
    toast.error("Please fill in all fields.");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match.");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long.");
    return false;
  }
  return true;
}
