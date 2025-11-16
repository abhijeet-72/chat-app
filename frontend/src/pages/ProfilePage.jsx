import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import useUpdateProfile from "../hooks/useUpdateProfile";
import useChangePassword from "../hooks/useChangePassword";
import useTheme from "../hooks/useTheme";
import defAvatar from "../../public/default-avatar.png";

// Back Arrow Icon
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

const ProfilePage = () => {
  const { theme, toggleTheme } = useTheme();
  const { authUser } = useAuthStore();
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(
    authUser.profilePic
  );
  const [bio, setBio] = useState(authUser.bio || "");
  const [username, setUsername] = useState(authUser.username);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const fileInputRef = useRef(null);

  const { loading: updateLoading, updateProfile } = useUpdateProfile();
  const { loading: passwordLoading, changePassword } = useChangePassword();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setProfilePicPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    await updateProfile({
      username,
      bio,
      profilePic: profilePicFile,
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const success = await changePassword({ oldPassword, newPassword });
    if (success) {
      setOldPassword("");
      setNewPassword("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative">
      {/* Back to Chat Button */}
      <Link
        to="/chat"
        className="absolute top-4 left-4 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500"
      >
        <BackIcon />
        Back to Chat
      </Link>

      {/* --- 4. ADD THEME TOGGLE BUTTON --- */}
      <button
        className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 absolute top-4 right-4 z-50 text-2xl"
        onClick={toggleTheme}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        {/* Profile Update Form */}
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Your Profile
          </h2>

          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={profilePicPreview || defAvatar}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 dark:border-gray-600"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full hover:bg-blue-700"
                onClick={() => fileInputRef.current.click()}
              >
                {/* Pencil Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path d="M2.695 14.763l-1.262 3.154a.5.5 0 0 0 .65.65l3.154-1.262a.5.5 0 0 0 .106-.059l9.7-9.7a1.5 1.5 0 0 0-2.121-2.121L2.754 14.657a.5.5 0 0 0-.059.106Z" />
                  <path d="M12.207 2.207a1.5 1.5 0 0 0-2.121 0l-1.5 1.5a.5.5 0 0 0 .707.707l1.5-1.5a.5.5 0 0 1 .707 0l1.5 1.5a.5.5 0 0 0 .707-.707l-1.5-1.5a1.5 1.5 0 0 0-2.121 0Z" />
                </svg>
              </button>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
              Username
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
              Bio
            </label>
            <textarea
              className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows="3"
              placeholder="Tell us about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={updateLoading}
          >
            {updateLoading ? "Saving..." : "Save Profile"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 border-t border-gray-300 dark:border-gray-600"></div>

        {/* Change Password Form */}
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Change Password
          </h3>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
              Old Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 text-white bg-gray-600 rounded-lg hover:bg-gray-700 disabled:opacity-50"
            disabled={passwordLoading}
          >
            {passwordLoading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
