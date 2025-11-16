import { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import useConversationStore from "../../store/conversationStore";
import { useSocketContext } from "../../context/SocketContext";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

import useLeaveGroup from "../../hooks/useLeaveGroup";
import useClearChat from "../../hooks/useClearChat";

// --- ICONS ---
const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M10 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM10 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM11.5 15.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
      clipRule="evenodd"
    />
  </svg>
);
const LeaveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M2 5a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4.586A3.5 3.5 0 0 1 18 13v1a3 3 0 0 1-3 3h-4.586A3.5 3.5 0 0 1 8 19H7a3 3 0 0 1-3-3v-1a3.5 3.5 0 0 1 1.5-2.828V5Zm3-1a1 1 0 0 0-1 1v10.586A3.5 3.5 0 0 1 3 16v1a1 1 0 0 0 1 1h1a3.5 3.5 0 0 1 3.5-3.5h5A3.5 3.5 0 0 1 17 18h1a1 1 0 0 0 1-1v-1a3.5 3.5 0 0 1-1.5-2.828V5a1 1 0 0 0-1-1H5Z"
      clipRule="evenodd"
    />
  </svg>
);
const ClearIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M8.75 1A2.75 2.75 0 0 0 6 3.75V4.5h8V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 0a4.25 4.25 0 0 0-4.25 4.25V4.5h8.5V4.25A4.25 4.25 0 0 0 10 0ZM4.5 5.5a.75.75 0 0 0 0 1.5h11a.75.75 0 0 0 0-1.5h-11ZM5.25 8.25a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0v-6.5a.75.75 0 0 1 .75-.75ZM8.5 8.25a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0v-6.5a.75.75 0 0 1 .75-.75ZM11.75 8.25a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0v-6.5a.75.75 0 0 1 .75-.75Z"
      clipRule="evenodd"
    />
  </svg>
);

// --- BACK ICON ---
const BackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      fillRule="evenodd"
      d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
      clipRule="evenodd"
    />
  </svg>
);

// (FluxLogo and NoChatSelected components remain the same)
const FluxLogo = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 128 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-70"
  >
    <path
      d="M64 0C28.6533 0 0 28.6533 0 64C0 99.3467 28.6533 128 64 128C99.3467 128 128 99.3467 128 64C128 28.6533 99.3467 0 64 0ZM64 120C32.9133 120 8 95.0867 8 64C8 32.9133 32.9133 8 64 8C95.0867 8 120 32.9133 120 64C120 95.0867 95.0867 120 64 120Z"
      fill="url(#paint0_linear)"
    />
    <path
      d="M87.6167 47.16C86.13 45.4267 83.3333 46.1367 83.3333 48.3333V60.6667H44.6667V48.3333C44.6667 46.1367 41.87 45.4267 40.3833 47.16L29.3333 59.9867C27.99 61.56 27.99 63.9267 29.3333 65.5L40.3833 78.3267C41.87 80.06 44.6667 79.35 44.6667 77.1533V64.82H83.3333V77.1533C83.3333 79.35 86.13 80.06 87.6167 78.3267L98.6667 65.5C100.01 63.9267 100.01 61.56 98.6667 59.9867L87.6167 47.16Z"
      fill="url(#paint1_linear)"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="64"
        y1="0"
        x2="64"
        y2="128"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4A90E2" />
        <stop offset="1" stopColor="#50E3C2" />
      </linearGradient>
      <linearGradient
        id="paint1_linear"
        x1="64"
        y1="46"
        x2="64"
        y2="79.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4A90E2" />
        <stop offset="1" stopColor="#50E3C2" />
      </linearGradient>
    </defs>
  </svg>
);
const NoChatSelected = () => {
  const { authUser } = useAuthStore();
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <FluxLogo />
      <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200 mt-6">
        Welcome, {authUser?.username}!
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Select a chat to start messaging.
      </p>
    </div>
  );
};
// --- End of placeholder components ---

// Main Component
const MessageContainer = () => {
  const {
    selectedConversation,
    messages,
    addMessage,
    setMessages,
    deleteMessage,
    setSelectedConversation, // <<< --- 2. GET SETTER FROM STORE
  } = useConversationStore();

  const { socket } = useSocketContext();
  const [isTyping, setIsTyping] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const { loading: leaveLoading, leaveGroup } = useLeaveGroup();
  const { loading: clearLoading, clearChat } = useClearChat();

  // --- Socket.IO Event Listeners ---
  useEffect(() => {
    if (socket) {
      // Listen for new messages
      socket.on("newMessage", (newMessage) => {
        if (selectedConversation?._id === newMessage.conversationId) {
          addMessage(newMessage);
          if (!selectedConversation.isGroupChat) {
            socket.emit("markMessagesAsRead", {
              otherUserId: newMessage.senderId,
            });
          }
        }
      });
      // ... (rest of listeners: typing, messagesRead, messageDeleted)
    }
    // ... (rest of dependencies)
  }, [
    socket,
    addMessage,
    selectedConversation,
    setMessages,
    messages,
    deleteMessage,
  ]);

  // --- Emit "mark as read" ---
  useEffect(() => {
    if (socket && selectedConversation?._id) {
      if (!selectedConversation.isGroupChat) {
        const otherUser = selectedConversation.participants.find(
          (p) => p._id !== useAuthStore.getState().authUser._id
        );
        if (otherUser) {
          socket.emit("markMessagesAsRead", {
            otherUserId: otherUser._id,
          });
        }
      }
    }
    setIsTyping(false);
  }, [selectedConversation, socket]);

  // --- GET CHAT PARTNER (FOR 1-ON-1) ---
  const getChatPartner = () => {
    if (!selectedConversation || selectedConversation.isGroupChat) return null;
    const authUser = useAuthStore.getState().authUser;
    return selectedConversation.participants.find(
      (p) => p._id !== authUser._id
    );
  };

  const chatPartner = getChatPartner();

  // --- Determine Header Name and Pic ---
  const chatName = selectedConversation?.isGroupChat
    ? selectedConversation.groupName
    : chatPartner?.username;

  const chatPic = selectedConversation?.isGroupChat
    ? "/default-group.png"
    : chatPartner?.profilePic || "/default-avatar.png";

  return (
    // 3. Add responsive rounding/shadow (full-screen on mobile, card on desktop)
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 md:rounded-lg md:shadow-md">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* --- HEADER (UPDATED) --- */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
            {/* --- 4. MOBILE-ONLY BACK BUTTON --- */}
            <button
              className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full md:hidden"
              onClick={() => setSelectedConversation(null)}
            >
              <BackIcon />
            </button>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
              <img
                src={chatPic}
                alt={`${chatName} profile`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name/Typing */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                {chatName}
              </p>
              {isTyping && (
                <p className="text-xs text-blue-500 dark:text-blue-400 animate-pulse">
                  typing...
                </p>
              )}
            </div>

            {/* SETTINGS MENU */}
            <div className="relative">
              <button
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                onClick={() => setShowMenu(!showMenu)}
              >
                <SettingsIcon />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 top-10 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg border dark:border-gray-700 z-50">
                  {selectedConversation.isGroupChat ? (
                    // Group Menu
                    <button
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                      onClick={leaveGroup}
                      disabled={leaveLoading}
                    >
                      <LeaveIcon />
                      {leaveLoading ? "Leaving..." : "Leave Group"}
                    </button>
                  ) : (
                    // 1-on-1 Menu
                    <button
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                      onClick={clearChat}
                      disabled={clearLoading}
                    >
                      <ClearIcon />
                      {clearLoading ? "Clearing..." : "Clear Chat"}
                    </button>
                  )}
                  {/* We could add "Add Members" here later */}
                </div>
              )}
            </div>
          </div>

          {/* Messages */}
          <Messages />

          {/* Input */}
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
