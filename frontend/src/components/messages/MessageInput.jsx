// 1. Add useEffect and update useRef
import { useState, useRef, useEffect } from "react";
import useSendMessage from "../../hooks/useSendMessage";
import useSendImage from "../../hooks/useSendImage";
import EmojiPicker from "emoji-picker-react";
// 2. Import hooks for socket and conversation
import { useSocketContext } from "../../context/SocketContext";
import useConversationStore from "../../store/conversationStore";

// (All Icon components remain the same - copy them from your file)
const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.98a.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
  </svg>
);
const ImageClipIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      fillRule="evenodd"
      d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 18.75V6a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 .75.75v12.75l-2.602-2.601a3.75 3.75 0 0 0-5.304 0L9.75 21H3.75A.75.75 0 0 1 3 18.75ZM9 9.75a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
      clipRule="evenodd"
    />
  </svg>
);
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
      clipRule="evenodd"
    />
  </svg>
);
const EmojiIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM8.25 10.5a.75.75 0 0 0-1.5 0v.001a.75.75 0 0 0 1.5 0V10.5Zm-1.06 4.903a.75.75 0 0 0-1.06 1.06c1.233 1.232 3.16 1.937 5.166 1.937s3.933-.705 5.166-1.937a.75.75 0 1 0-1.06-1.06 3.902 3.902 0 0 1-8.112 0ZM15.75 10.5a.75.75 0 0 0-1.5 0v.001a.75.75 0 0 0 1.5 0V10.5Z"
      clipRule="evenodd"
    />
  </svg>
);
// --- END ICONS ---

const MessageInput = () => {
  const [textMessage, setTextMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);

  // 3. Get socket and selected chat
  const { socket } = useSocketContext();
  const { selectedConversation } = useConversationStore();

  const { loading: textLoading, sendMessage } = useSendMessage();
  const { loading: imageLoading, sendImage } = useSendImage();
  const loading = textLoading || imageLoading;

  // 4. Ref to track typing state
  const isTypingRef = useRef(false);

  // 5. useEffect to emit typing events
  useEffect(() => {
    if (!socket || !selectedConversation) return;

    if (textMessage.length > 0) {
      // User is typing
      if (!isTypingRef.current) {
        isTypingRef.current = true;
        socket.emit("typing", { receiverId: selectedConversation._id });
      }
    } else {
      // User stopped typing
      if (isTypingRef.current) {
        isTypingRef.current = false;
        socket.emit("stopTyping", { receiverId: selectedConversation._id });
      }
    }
  }, [textMessage, socket, selectedConversation]);

  // (onEmojiClick remains the same)
  const onEmojiClick = (emojiObject) => {
    setTextMessage((prevInput) => prevInput + emojiObject.emoji);
  };

  // (handleFileChange remains the same)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setTextMessage("");
      setShowEmojiPicker(false);
    }
  };

  // (clearImage remains the same)
  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  // 6. Update handleSubmit to emit stopTyping
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showEmojiPicker) setShowEmojiPicker(false);

    // Emit stopTyping when message is sent
    if (isTypingRef.current) {
      isTypingRef.current = false;
      socket.emit("stopTyping", { receiverId: selectedConversation._id });
    }

    if (imageFile) {
      await sendImage(imageFile);
      clearImage();
    } else if (textMessage) {
      await sendMessage(textMessage);
      setTextMessage("");
    }
  };

  return (
    <div className="relative p-4 border-t border-gray-200 dark:border-gray-700">
      {/* ... (ImagePreview and EmojiPicker JSX remains the same) ... */}
      {imagePreview && (
        <div className="relative w-32 mb-2">
          <img
            src={imagePreview}
            alt="Selected preview"
            className="w-full h-auto rounded-lg object-cover"
          />
          <button
            onClick={clearImage}
            className="absolute -top-2 -right-2 p-0.5 bg-gray-600 text-white rounded-full hover:bg-red-500"
            disabled={loading}
          >
            <CloseIcon />
          </button>
        </div>
      )}
      {showEmojiPicker && (
        <div className="absolute bottom-20 right-4 z-50">
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            autoFocusSearch={false}
            searchDisabled={true}
            previewConfig={{ showPreview: false }}
            theme="auto"
            height={350}
            width={300}
          />
        </div>
      )}

      {/* Main Input Form */}
      <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        {/* ... (File Picker Button and Emoji Toggle Button) ... */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          disabled={loading}
        />
        <button
          type="button"
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 disabled:opacity-50"
          onClick={() => fileInputRef.current.click()}
          disabled={loading || !!imagePreview}
        >
          <ImageClipIcon />
        </button>
        <button
          type="button"
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 disabled:opacity-50"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          disabled={loading || !!imagePreview}
        >
          <EmojiIcon />
        </button>

        {/* Text Input */}
        <input
          type="text"
          className="flex-1 px-3 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={imagePreview ? "Image selected" : "Type a message..."}
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
          disabled={loading || !!imagePreview}
        />

        {/* Send Button */}
        <button
          type="submit"
          className="p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          disabled={loading || (!textMessage && !imageFile)}
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          ) : (
            <SendIcon />
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
