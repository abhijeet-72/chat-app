import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthStore();

  const login = async ({ username, password }) => {
    // 1. Validation
    const success = handleInputErrors({ username, password });
    if (!success) return;

    setLoading(true);
    try {
      // 2. API Call
      const res = await axios.post("/api/auth/login", {
        username,
        password,
      });

      const data = res.data;

      // 3. Save user to Zustand store
      setAuthUser(data);

      // No toast needed, redirect is sufficient
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "An error occurred during login.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleInputErrors({ username, password }) {
  if (!username || !password) {
    toast.error("Please fill in all fields.");
    return false;
  }
  return true;
}
