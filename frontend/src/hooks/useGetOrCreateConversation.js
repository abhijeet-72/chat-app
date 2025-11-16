import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useConversationStore from "../store/conversationStore";

const useGetOrCreateConversation = () => {
  const [loading, setLoading] = useState(false);
  const { setSelectedConversation } = useConversationStore();

  const getOrCreateConversation = async (userId) => {
    setLoading(true);
    try {
      // Call our new backend route
      const res = await axios.post(
        `/api/conversations/find/${userId}`,
        null, // <<< --- ADD 'null' for the data argument
        { withCredentials: true }
      );

      // For axios.post, the third argument is config.
      // Since route doesn't need a request body, passed null as the second argument.
      // So withCredentials is correctly read as the third.

      const conversation = res.data;

      // Set this as the active conversation
      setSelectedConversation(conversation);
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { loading, getOrCreateConversation };
};

export default useGetOrCreateConversation;
