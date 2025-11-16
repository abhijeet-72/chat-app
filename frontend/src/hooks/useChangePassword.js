import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const changePassword = async ({ oldPassword, newPassword }) => {
    setLoading(true);
    try {
      await axios.put(
        "/api/users/password",
        {
          oldPassword,
          newPassword,
        },
        { withCredentials: true }
      );

      toast.success("Password changed successfully!");
      return true; // Indicate success
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An error occurred.";
      toast.error(errorMessage);
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  return { loading, changePassword };
};

export default useChangePassword;
