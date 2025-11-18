import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

// --- Page Imports ---
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";

// --- Store Import ---
import useAuthStore from "./store/authStore";

function App() {
  const { authUser } = useAuthStore();

  return (
    <Router>
      {/* LAYOUT FIX: 
         Removed 'h-screen' and 'overflow-hidden'. 
         We use 'min-h-screen' to ensure full background coverage, 
         but let individual pages (like ChatPage) handle their own locking.
      */}
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Toaster />

        <Routes>
          <Route
            path="/"
            element={!authUser ? <LandingPage /> : <Navigate to="/chat" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/chat" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignupPage /> : <Navigate to="/chat" />}
          />
          <Route
            path="/chat"
            element={authUser ? <ChatPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
