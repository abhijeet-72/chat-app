import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useConversationStore from "../store/conversationStore";

const useCreateGroup = () => {
  const [loading, setLoading] = useState(false);
  const { setSelectedConversation } = useConversationStore();

  const createGroup = async ({ groupName, participants }) => {
    // 1. Validation
    if (!groupName || !participants || participants.length === 0) {
      toast.error("Please enter a group name and select at least one user.");
      return;
    }

    setLoading(true);
    try {
      // 2. Call the API
      const res = await axios.post(
        "/api/conversations/group",
        {
          groupName,
          participants,
        }, // This is an array of user IDs
        { withCredentials: true }
      );

      const newGroup = res.data;

      // 3. Set this new group as the selected conversation
      setSelectedConversation(newGroup);
      toast.success(`Group "${groupName}" created!`);
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { loading, createGroup };
};

export default useCreateGroup;
