import { useState } from "react";
import toast from "react-hot-toast";
import useGetConversations from "../../hooks/useGetConversations"; // This is our "get ALL users" hook
import useGetOrCreateConversation from "../../hooks/useGetOrCreateConversation";

// (SearchIcon component remains the same)
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      fillRule="evenodd"
      d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
      clipRule="evenodd"
    />
  </svg>
);

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { conversations: allUsers } = useGetConversations(); // Get all users
  const { getOrCreateConversation } = useGetOrCreateConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;

    // Find the user by username
    const foundUser = allUsers.find(
      (u) => u.username.toLowerCase() === search.toLowerCase()
    );

    if (foundUser) {
      // Start a 1-on-1 chat
      getOrCreateConversation(foundUser._id);
      setSearch("");
    } else {
      toast.error("No user found with that username.");
    }
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search to start chat..."
        className="flex-1 px-3 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        <SearchIcon />
      </button>
      {/* <<< --- THIS IS THE FIX */}
    </form>
  );
};

export default SearchInput;
