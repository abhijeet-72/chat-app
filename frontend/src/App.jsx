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
          1. 'h-screen w-full': Forces the app to fill the entire viewport.
          2. 'overflow-hidden': Prevents the main window from scrolling (scroll bars will be inside the chat list/window instead).
      */}
      <div className="h-screen w-full flex bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300">
        {/* Toast notifications stay at the top level */}
        <Toaster />

        {/* Inner container to hold the pages */}
        <div className="flex w-full h-full overflow-hidden">
          <Routes>
            {/* Landing Page Route */}
            <Route
              path="/"
              element={!authUser ? <LandingPage /> : <Navigate to="/chat" />}
            />

            {/* Auth Routes */}
            <Route
              path="/login"
              element={!authUser ? <LoginPage /> : <Navigate to="/chat" />}
            />
            <Route
              path="/signup"
              element={!authUser ? <SignupPage /> : <Navigate to="/chat" />}
            />

            {/* Protected Chat Route */}
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
      </div>
    </Router>
  );
}

export default App;
