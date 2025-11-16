import { useEffect, useState } from "react";
import useConversationStore from "../store/conversationStore";
import axios from "axios";
import toast from "react-hot-toast";
import { useSocketContext } from "../context/SocketContext"; // <<< --- 1. IMPORT

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);

  // Get state AND actions from the store
  const { selectedConversation, setMessages, addMessage } =
    useConversationStore(); // <<< --- 2. GET addMessage
  const { socket } = useSocketContext(); // <<< --- 3. GET SOCKET

  // This effect runs once to FETCH old messages
  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation) return;
      setLoading(true);

      try {
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

  // --- 4. ADD THIS NEW EFFECT TO LISTEN FOR MESSAGES ---
  useEffect(() => {
    if (!socket) return; // Don't run if socket isn't connected

    // Listener function
    const handleNewMessage = (newMessage) => {
      // Only add message if it belongs to the currently selected chat
      if (newMessage.conversationId === selectedConversation?._id) {
        addMessage(newMessage);
      }
    };

    // Listen for the 'newMessage' event
    socket.on("newMessage", handleNewMessage);

    // Cleanup function: remove the listener when component unmounts
    // or when the socket/selectedConversation changes.
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedConversation, addMessage]);
  // --- END OF FIX ---

  // This hook now only returns the loading state.
  // The messages are handled by the store.
  return { loading };
};

export default useGetMessages;
