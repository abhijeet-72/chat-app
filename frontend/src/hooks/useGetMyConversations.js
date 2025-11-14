import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSocketContext } from "../context/SocketContext";
import useConversationStore from "../store/conversationStore";

const useGetMyConversations = () => {
  const [loading, setLoading] = useState(false);

  // Get actions and state from the store
  const {
    conversations,
    setConversations,
    addConversation,
    removeConversation,
  } = useConversationStore();

  const { socket } = useSocketContext();

  // 1. Fetch initial conversations
  useEffect(() => {
    const getMyConversations = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/conversations");
        setConversations(res.data);
      } catch (error) {
        toast.error(error.response?.data?.error || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    getMyConversations();
  }, [setConversations]);

  // 2. Listen for all real-time updates
  useEffect(() => {
    if (!socket) return;

    const handleNewGroup = (newGroup) => {
      addConversation(newGroup);
    };

    const handleNewMessage = (newMessage) => {
      // Update the last message and re-sort
      setConversations((prev) => {
        const updatedConversations = prev.map((convo) => {
          if (convo._id === newMessage.conversationId) {
            return {
              ...convo,
              lastMessage: {
                text:
                  newMessage.messageType === "text"
                    ? newMessage.content
                    : "Image",
                sender: newMessage.senderId,
                sentAt: newMessage.createdAt,
              },
            };
          }
          return convo;
        });
        updatedConversations.sort(
          (a, b) =>
            new Date(b.lastMessage.sentAt) - new Date(a.lastMessage.sentAt)
        );
        return updatedConversations;
      });
    };

    // --- Listen for our new events ---
    const handleChatCleared = ({ conversationId }) => {
      // Clear the last message for this convo
      setConversations((prev) =>
        prev.map((convo) => {
          if (convo._id === conversationId) {
            return { ...convo, lastMessage: null };
          }
          return convo;
        })
      );
    };

    const handleUserLeft = ({ conversationId, userId }) => {
      // This is complex: we'd need to update participant list
      // For now, we'll just remove the convo if *we* are the one who left
      // (The useLeaveGroup hook handles our own removal)
      console.log(`User ${userId} left group ${conversationId}`);
    };

    socket.on("newGroupChat", handleNewGroup);
    socket.on("newMessage", handleNewMessage);
    socket.on("chatCleared", handleChatCleared);
    socket.on("userLeftGroup", handleUserLeft);

    return () => {
      socket.off("newGroupChat", handleNewGroup);
      socket.off("newMessage", handleNewMessage);
      socket.off("chatCleared", handleChatCleared);
      socket.off("userLeftGroup", handleUserLeft);
    };
  }, [socket, setConversations, addConversation, removeConversation]);

  // Return the state from the store
  return { loading, conversations };
};

export default useGetMyConversations;
