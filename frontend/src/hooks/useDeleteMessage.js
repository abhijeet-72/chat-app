import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useConversationStore from "../store/conversationStore";

const useDeleteMessage = () => {
  const [loading, setLoading] = useState(false);
  const { deleteMessage: deleteMessageFromStore } = useConversationStore();

  const deleteMessage = async (messageId) => {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return;
    }

    setLoading(true);
    try {
      // 1. Call the API to delete from DB
      await axios.delete(`/api/messages/${messageId}`);

      // 2. Remove from Zustand store
      deleteMessageFromStore(messageId);
      toast.success("Message deleted");
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteMessage };
};

export default useDeleteMessage;
