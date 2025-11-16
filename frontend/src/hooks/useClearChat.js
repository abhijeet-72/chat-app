import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useConversationStore from "../store/conversationStore";

const useClearChat = () => {
  const [loading, setLoading] = useState(false);
  // Get actions from the store
  const { selectedConversation, setMessages } = useConversationStore();

  const clearChat = async () => {
    if (!selectedConversation || selectedConversation.isGroupChat) return;
    if (
      !window.confirm(
        "Are you sure you want to clear this chat? This will delete all messages for both of you."
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`/api/messages/clear/${selectedConversation._id}`, {
        withCredentials: true,
      });

      // 1. Clear messages from the store
      setMessages([]);
      toast.success("Chat history cleared.");
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { loading, clearChat };
};

export default useClearChat;
