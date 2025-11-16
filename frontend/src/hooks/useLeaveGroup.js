import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useConversationStore from "../store/conversationStore";

const useLeaveGroup = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, setSelectedConversation, removeConversation } =
    useConversationStore();

  const leaveGroup = async () => {
    if (!selectedConversation || !selectedConversation.isGroupChat) return;

    if (
      !window.confirm(
        `Are you sure you want to leave ${selectedConversation.groupName}?`
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      await axios.put(
        `/api/conversations/leave/${selectedConversation._id}`,
        null,
        { withCredentials: true }
      );
      // This route is protected and needs credentials.
      // For axios.put without a data body, we pass null as the second argument so the config (third argument) is read correctly.

      // 1. Remove from sidebar
      removeConversation(selectedConversation._id);
      // 2. Clear selected chat
      setSelectedConversation(null);

      toast.success(`You left ${selectedConversation.groupName}.`);
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { loading, leaveGroup };
};

export default useLeaveGroup;
