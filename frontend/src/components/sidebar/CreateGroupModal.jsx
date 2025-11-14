import { useState } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import useCreateGroup from "../../hooks/useCreateGroup";

// Close Icon
const CloseIcon = () => (
  <svg
    xmlns="http://www.w.w.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      fillRule="evenodd"
      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
);

// Checkbox component for user selection
const UserCheckbox = ({ user, isSelected, onToggle }) => (
  <label className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-600">
    <input
      type="checkbox"
      className="form-checkbox h-5 w-5 text-blue-600 rounded"
      checked={isSelected}
      onChange={() => onToggle(user._id)}
    />
    {/* Avatar Placeholder */}
    <div className="w-10 h-10 bg-blue-300 dark:bg-blue-800 rounded-full flex items-center justify-center text-lg shrink-0">
      <span>{user.username.charAt(0).toUpperCase()}</span>
    </div>
    <span className="font-medium text-gray-800 dark:text-gray-200">
      {user.username}
    </span>
  </label>
);

const CreateGroupModal = ({ onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]); // Stores array of IDs
  const [searchTerm, setSearchTerm] = useState("");

  const { loading: loadingUsers, conversations: allUsers } =
    useGetConversations();
  const { loading: loadingCreate, createGroup } = useCreateGroup();

  // Toggle user selection
  const handleUserToggle = (userId) => {
    setSelectedUsers(
      (prev) =>
        prev.includes(userId)
          ? prev.filter((id) => id !== userId) // Remove user
          : [...prev, userId] // Add user
    );
  };

  // Filter users based on search
  const filteredUsers = allUsers.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createGroup({ groupName, participants: selectedUsers });
    onClose(); // Close modal on success
  };

  return (
    // Modal Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md m-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Create a New Group
            </h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4">
            {/* Group Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                Group Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="My Awesome Group"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
              />
            </div>

            {/* User Search */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                Select Members
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Search for users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* User List */}
            <div className="max-h-60 overflow-y-auto space-y-2 p-1">
              {loadingUsers && (
                <div className="flex justify-center items-center h-full">
                  <div className="w-6 h-6 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                </div>
              )}
              {!loadingUsers &&
                filteredUsers.map((user) => (
                  <UserCheckbox
                    key={user._id}
                    user={user}
                    isSelected={selectedUsers.includes(user._id)}
                    onToggle={handleUserToggle}
                  />
                ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end p-4 border-t dark:border-gray-700">
            <button
              type="submit"
              className="w-full py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              disabled={loadingCreate}
            >
              {loadingCreate ? "Creating Group..." : "Create Group"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
