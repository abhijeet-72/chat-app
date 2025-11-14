import useGetMyConversations from "../../hooks/useGetMyConversations";
import useConversationStore from "../../store/conversationStore";
import useAuthStore from "../../store/authStore";

/**
 * A single conversation (1-on-1 or Group) in the sidebar.
 */
const Conversation = ({ conversation }) => {
  const { selectedConversation, setSelectedConversation } =
    useConversationStore();
  const { authUser } = useAuthStore();
  const isSelected = selectedConversation?._id === conversation._id;

  // --- Determine name, picture, and last message ---
  let chatName = "";
  let chatPic = "/default-avatar.png"; // Default fallback
  let lastMessageText = conversation.lastMessage?.text || "No messages yet";

  if (conversation.isGroupChat) {
    chatName = conversation.groupName;
    chatPic = "/default-group.png"; // <<< --- Use a default group icon
  } else {
    // It's a 1-on-1 chat
    const otherParticipant = conversation.participants.find(
      (p) => p._id !== authUser._id
    );
    chatName = otherParticipant?.username || "User";

    // <<< --- USE PROFILE PIC --- >>>
    if (otherParticipant?.profilePic) {
      chatPic = otherParticipant.profilePic;
    }
  }

  // Add "You: " prefix if authUser was the sender
  if (conversation.lastMessage?.sender === authUser._id) {
    lastMessageText = `You: ${lastMessageText}`;
  }

  // Truncate last message
  if (lastMessageText.length > 30) {
    lastMessageText = lastMessageText.substring(0, 30) + "...";
  }
  // --- End of logic ---

  return (
    <div
      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer
        ${
          isSelected
            ? "bg-blue-200 dark:bg-gray-700"
            : "hover:bg-blue-100 dark:hover:bg-gray-600"
        }
      `}
      onClick={() => setSelectedConversation(conversation)}
    >
      {/* --- AVATAR (UPDATED) --- */}
      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
        <img
          src={chatPic}
          alt={`${chatName} profile`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">
          {chatName}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {lastMessageText}
        </p>
      </div>
    </div>
  );
};

/**
 * The list of all *actual* conversations (1-on-1 and group).
 */
// const Conversations = () => {
//   // (This part remains the same)
//   const { loading, conversations } = useGetMyConversations();

//   return (
//     <div className="flex flex-col gap-2">
//       {!loading &&
//         conversations.length > 0 &&
//         conversations.map((convo) => (
//           <Conversation key={convo._id} conversation={convo} />
//         ))}

//       {loading && (
//         <div className="flex justify-center items-center h-full">
//           <div className="w-6 h-6 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
//         </div>
//       )}

//       {!loading && conversations.length === 0 && (
//         <p className="text-center text-gray-500 dark:text-gray-400">
//           No conversations. Start one by searching!
//         </p>
//       )}
//     </div>
//   );
// };

/**
 * The list of all *actual* conversations (1-on-1 and group).
 */
const Conversations = () => {
  // 1. Call the hook (it manages its own state)
  const { loading } = useGetMyConversations();

  // 2. Get the conversations *from the store*
  const { conversations } = useConversationStore();

  return (
    <div className="flex flex-col gap-2">
      {!loading &&
        conversations.length > 0 &&
        conversations.map((convo) => (
          <Conversation key={convo._id} conversation={convo} />
        ))}

      {loading && (
        <div className="flex justify-center items-center h-full">
          <div className="w-6 h-6 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && conversations.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No conversations. Start one by searching!
        </p>
      )}
    </div>
  );
};

export default Conversations;
