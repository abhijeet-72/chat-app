import { useEffect, useState } from "react";
import useConversationStore from "../store/conversationStore";
import axios from "axios";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);

  // Get state AND actions from the store
  const { selectedConversation, setMessages } = useConversationStore();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation) return;
      setLoading(true);

      try {
        // const res = await axios.get(
        //   `/api/messages/${selectedConversation._id}`
        // );
        const res = await axios.get(
          `/api/messages/convo/${selectedConversation._id}`,
          { withCredentials: true }
        );
        // 1. Set messages in the Zustand store
        setMessages(res.data);
      } catch (error) {
        const errorMessage =
          error.response?.data?.error || "An error occurred.";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation, setMessages]); // Add setMessages to dependency array

  // This hook now only returns the loading state.
  // The messages are handled by the store.
  return { loading };
};

export default useGetMessages;
