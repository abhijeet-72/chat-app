import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";

const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthStore();

  const updateProfile = async (formData) => {
    setLoading(true);
    try {
      // formData will contain { username, bio, profilePic (file) }
      // We use FormData because we are sending a file
      const data = new FormData();
      data.append("username", formData.username);
      data.append("bio", formData.bio);
      if (formData.profilePic) {
        data.append("profilePic", formData.profilePic);
      }

      const res = await axios.put("/api/users/profile", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update the user in our auth store
      setAuthUser(res.data);
      toast.success("Profile updated successfully!");
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateProfile };
};

export default useUpdateProfile;
