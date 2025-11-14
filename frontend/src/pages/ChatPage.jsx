import Sidebar from "../components/sidebar/Sidebar";
import MessageContainer from "../components/messages/MessageContainer";

const ChatPage = () => {
  return (
    <div className="flex h-screen w-full p-4 gap-4">
      {/* We use a flex container to create the sidebar and message container layout.
        The h-screen ensures it takes the full viewport height.
      */}

      {/* Sidebar: Fixed width, takes 30% of space, max-width of 450px */}
      <div className="w-full md:w-[30%] md:max-w-md">
        <Sidebar />
      </div>

      {/* Message Container: Takes remaining space */}
      <div className="flex-1">
        <MessageContainer />
      </div>
    </div>
  );
};

export default ChatPage;
