import Sidebar from "../components/sidebar/Sidebar";
import MessageContainer from "../components/messages/MessageContainer";
import useConversationStore from "../store/conversationStore";

const ChatPage = () => {
  // 1. Get the selected conversation from the store
  const { selectedConversation } = useConversationStore();

  return (
    // 2. Remove padding on mobile (p-0) and keep it on desktop (md:p-4)
    <div className="flex h-screen w-full p-0 md:p-4 md:gap-4">
      {/* 3. Sidebar Logic:
        - Show on desktop (md:flex)
        - On mobile, show by default (flex), but HIDE if a chat is selected (selectedConversation ? "hidden" : "flex")
      */}
      <div
        className={`w-full md:w-[30%] md:max-w-md ${
          selectedConversation ? "hidden" : "flex"
        } md:flex`}
      >
        <Sidebar />
      </div>

      {/* 4. Message Container Logic:
        - Show on desktop (md:flex)
        - On mobile, HIDE by default (hidden), but SHOW if a chat is selected (selectedConversation ? "flex" : "hidden")
      */}
      <div
        className={`flex-1 ${selectedConversation ? "flex" : "hidden"} md:flex`}
      >
        <MessageContainer />
      </div>
    </div>
  );
};

export default ChatPage;
