import { useState } from "react";
import useAuthStore from "../../store/authStore";
import axios from "axios";
import toast from "react-hot-toast";

// Logout Icon (Heroicons)
const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      fillRule="evenodd"
      d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
);

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const { logoutUser } = useAuthStore();

  const handleLogout = async () => {
    setLoading(true);
    try {
      // 1. Call API to clear the httpOnly cookie
      await axios.post("/api/auth/logout");

      // 2. Clear user from Zustand store (and localStorage)
      logoutUser();

      // 3. Show success toast
      toast.success("Logged out successfully");

      // App.jsx will automatically redirect to /login
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "An error occurred during logout.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="btn btn-sm w-full flex items-center justify-center gap-2 px-3 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
      disabled={loading}
      onClick={handleLogout}
    >
      {loading ? (
        "Logging out..."
      ) : (
        <>
          <LogoutIcon />
          <span>Logout</span>
        </>
      )}
    </button>
  );
};

export default LogoutButton;
