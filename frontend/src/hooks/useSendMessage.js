import { useState } from "react";
import useConversationStore from "../store/conversationStore";
import axios from "axios";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, addMessage } = useConversationStore();

  const sendMessage = async (messageContent) => {
    if (!messageContent.trim()) return; // Don't send empty messages

    setLoading(true);
    try {
      // const res = await axios.post(
      //   `/api/messages/send/${selectedConversation._id}`,
      const res = await axios.post(
        `/api/messages/send/${selectedConversation._id}`,
        {
          message: messageContent,
          messageType: "text",
        },
        { withCredentials: true }
      );

      const newMessage = res.data;

      // 1. Add the new message to our Zustand store
      addMessage(newMessage);
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
