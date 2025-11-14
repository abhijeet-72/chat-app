import { useEffect, useRef } from "react";
import useConversationStore from "../../store/conversationStore";
import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";

// (MessageSkeleton component remains the same)
const MessageSkeleton = () => (
  <div className="flex flex-col gap-4">
    <div className="flex justify-start">
      <div className="w-1/2 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
    </div>
    <div className="flex justify-end">
      <div className="w-1/2 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
    </div>
    <div className="flex justify-start">
      <div className="w-1/3 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
    </div>
  </div>
);

const Messages = () => {
  // 1. Get loading state from the hook
  const { loading } = useGetMessages();

  // 2. Get messages from the STORE
  const { messages } = useConversationStore();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 3. Auto-scroll when messages array changes
  useEffect(() => {
    // Timeout gives the DOM time to update before scrolling
    setTimeout(scrollToBottom, 100);
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {loading && <MessageSkeleton />}

      {!loading &&
        messages.length > 0 &&
        messages.map((msg) => <Message key={msg._id} message={msg} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No messages yet. Say hi!
        </p>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
