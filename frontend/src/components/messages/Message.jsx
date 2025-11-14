import { useState } from "react";
import useAuthStore from "../../store/authStore";
import useConversationStore from "../../store/conversationStore"; // 1. Import store
import useDeleteMessage from "../../hooks/useDeleteMessage";

// 2. Add Read/Sent Icons
const SentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
      clipRule="evenodd"
    />
  </svg>
);

const ReadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5 text-blue-400"
  >
    <path
      fillRule="evenodd"
      d="M12.204 4.153a.75.75 0 0 1 .143 1.052l-4 5.25a.75.75 0 0 1-1.127.075l-2.25-2.25a.75.75 0 0 1 1.06-1.06l1.664 1.664 3.48-4.576a.75.75 0 0 1 1.05-.143Z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
      clipRule="evenodd"
    />
  </svg>
);

// 3. Add Delete (Trash) Icon
const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path
      fillRule="evenodd"
      d="M8.75 1A2.75 2.75 0 0 0 6 3.75V4.5h8V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 0a4.25 4.25 0 0 0-4.25 4.25V4.5h8.5V4.25A4.25 4.25 0 0 0 10 0ZM4.5 5.5a.75.75 0 0 0 0 1.5h11a.75.75 0 0 0 0-1.5h-11ZM5.25 8.25a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0v-6.5a.75.75 0 0 1 .75-.75ZM8.5 8.25a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0v-6.5a.75.75 0 0 1 .75-.75ZM11.75 8.25a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0v-6.5a.75.75 0 0 1 .75-.75Z"
      clipRule="evenodd"
    />
  </svg>
);

const Message = ({ message }) => {
  const { authUser } = useAuthStore();
  // 3. Get selected conversation
  const { selectedConversation } = useConversationStore();
  const { loading, deleteMessage } = useDeleteMessage();

  const [showDelete, setShowDelete] = useState(false);

  const fromMe = message.senderId === authUser._id;
  const isImage = message.messageType === "image";

  const chatAlign = fromMe ? "justify-end" : "justify-start";
  const bubbleBg = fromMe
    ? "bg-blue-600 dark:bg-blue-500"
    : "bg-gray-200 dark:bg-gray-700";
  const textColor = fromMe ? "text-white" : "text-gray-900 dark:text-white";

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // 4. Determine Read Status
  let readStatusIcon = null;
  if (fromMe && selectedConversation) {
    // Check if the other user's ID is in the readBy array
    const isRead = message.readBy.includes(selectedConversation._id);
    readStatusIcon = isRead ? <ReadIcon /> : <SentIcon />;
  }

  return (
    // 6. Add mouse enter/leave events to the main wrapper
    <div
      className={`flex ${chatAlign} mb-3 group`} // 'group' for hover
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      {/* 7. Add Delete Button for 'fromMe' */}
      {fromMe && showDelete && !loading && (
        <button
          className="p-1.5 text-gray-500 hover:text-red-500 self-center mr-1.5"
          onClick={() => deleteMessage(message._id)}
        >
          <DeleteIcon />
        </button>
      )}
      {/* Show spinner if deleting */}
      {fromMe && loading && (
        <div className="p-1.5 self-center mr-1.5">
          <div className="w-4 h-4 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* --- Message Bubble --- */}
      <div
        className={`max-w-xs md:max-w-md shadow rounded-lg
          ${isImage ? "p-1.5 bg-opacity-90" : `px-4 py-2 ${bubbleBg}`}
          ${isImage && fromMe ? "bg-blue-600 dark:bg-blue-500" : ""}
          ${isImage && !fromMe ? "bg-gray-200 dark:bg-gray-700" : ""}
        `}
      >
        {isImage ? (
          // --- Image Message ---
          <div className="relative">
            <img
              src={message.content}
              alt="Sent"
              className="rounded-md max-w-full h-auto"
            />
            <div className="absolute bottom-1 right-1.5 flex items-center gap-1">
              <span className="text-xs text-white opacity-90 bg-black/30 rounded px-1 py-0.5">
                {formatTimestamp(message.createdAt)}
              </span>
              {/* 5. Add read status to image */}
              <span className="text-white opacity-90">{readStatusIcon}</span>
            </div>
          </div>
        ) : (
          // --- Text Message ---
          <div>
            <p className={textColor}>{message.content}</p>
            <div className="flex items-center justify-end gap-1.5 mt-1">
              <span
                className={`text-xs opacity-70 ${
                  fromMe ? "text-gray-200" : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {formatTimestamp(message.createdAt)}
              </span>
              {/* 6. Add read status to text */}
              <span
                className={`opacity-70 ${
                  fromMe ? "text-gray-200" : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {readStatusIcon}
              </span>
            </div>
          </div>
        )}
      </div>
      {/* 8. Add (empty) spacer for incoming messages to align them
          This ensures bubbles don't jump when the delete icon appears
      */}
      {!fromMe && <div className="w-8" />}
    </div>
  );
};

export default Message;
