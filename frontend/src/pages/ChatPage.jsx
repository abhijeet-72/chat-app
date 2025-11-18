import Sidebar from "../components/sidebar/Sidebar";
import MessageContainer from "../components/messages/MessageContainer";
import useConversationStore from "../store/conversationStore";

const ChatPage = () => {
  const { selectedConversation } = useConversationStore();

  return (
    // LAYOUT FIX: Removed padding and gaps. Added bg color to prevent white flashes.
    <div className="flex h-screen w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Sidebar Logic:
         - W-full on mobile
         - Fixed width (w-80 to w-96) on desktop
         - Hidden on mobile if chat is selected
      */}
      <div
        className={`w-full md:w-80 lg:w-96 flex-shrink-0 h-full ${
          selectedConversation ? "hidden md:flex" : "flex"
        }`}
      >
        <Sidebar />
      </div>

      {/* Message Container Logic:
         - Takes remaining space (flex-1)
         - Hidden on mobile if NO chat is selected
      */}
      <div
        className={`flex-1 h-full ${
          selectedConversation ? "flex" : "hidden md:flex"
        }`}
      >
        <MessageContainer />
      </div>
    </div>
  );
};

export default ChatPage;
