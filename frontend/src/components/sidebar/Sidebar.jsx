import { useState } from "react";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import CreateGroupModal from "./CreateGroupModal";
import useAuthStore from "../../store/authStore";
import useTheme from "../../hooks/useTheme";

const NewGroupIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      fillRule="evenodd"
      d="M8.25 6.75a3.75 3.75 0 0 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 6.75a2.25 2.25 0 1 0-4.5 0 2.25 2.25 0 0 0 4.5 0ZM16.5 10.5A4.5 4.5 0 0 0 12 6a4.5 4.5 0 0 0-4.5 4.5v1.875c0 1.256-.463 2.39-1.242 3.228-.622.673-1.03 1.58-1.03 2.647V21a.75.75 0 0 0 .75.75h15a.75.75 0 0 0 .75-.75v-2.75c0-1.066-.408-1.974-1.03-2.647-.779-.838-1.242-1.972-1.242-3.228V10.5ZM18 18.25v.75H6v-.75c0-.661.27-1.29.75-1.75.564-.538 1.24-1.042 1.706-1.624a5.986 5.986 0 0 0 1.294-3.126V10.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5v1.5c0 1.15.42 2.222 1.294 3.126.466.582 1.142 1.086 1.706 1.624.48.46.75 1.089.75 1.75Z"
      clipRule="evenodd"
    />
  </svg>
);

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const { authUser } = useAuthStore();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* LAYOUT FIX: Removed rounded/shadow. Added w-full. */}
      <div className="flex flex-col h-full w-full border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        {/* Top Section with Padding */}
        <div className="p-4">
          <SearchInput />
          <div className="my-4 border-t border-gray-300 dark:border-gray-600"></div>
          <button
            className="flex items-center justify-center gap-2 w-full p-2 mb-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setShowModal(true)}
          >
            <NewGroupIcon />
            <span>New Group Chat</span>
          </button>
        </div>

        {/* Conversations (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-2">
          <Conversations />
        </div>

        {/* Bottom Section with Padding */}
        <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
          <Link
            to="/profile"
            className="w-10 h-10 rounded-full overflow-hidden shrink-0 hover:opacity-80 transition-opacity"
            title="Go to Profile"
          >
            <img
              src={authUser.profilePic || "/default-avatar.png"}
              alt="Your Profile"
              className="w-full h-full object-cover"
            />
          </Link>

          <div className="flex-1">
            <LogoutButton />
          </div>

          <button
            className="p-2 rounded-lg text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-2xl transition-colors"
            onClick={toggleTheme}
            title="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>

      {showModal && <CreateGroupModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Sidebar;
