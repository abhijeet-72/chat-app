// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { Toaster } from "react-hot-toast";

// // --- Page Imports ---
// import LandingPage from "./pages/LandingPage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import ChatPage from "./pages/ChatPage";

// // --- Hook Imports ---
// import useTheme from "./hooks/useTheme";
// // --- 1. IMPORT THE ZUSTAND STORE ---
// import useAuthStore from "./store/authStore";

// function App() {
//   // Use our custom theme hook
//   const { theme, toggleTheme } = useTheme();

//   // --- 2. GET THE AUTH USER FROM THE STORE ---
//   const { authUser } = useAuthStore();

//   return (
//     <Router>
//       {/* This div is now the root container.
//         We apply text colors for light/dark mode here.
//       */}
//       <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
//         {/* Theme Toggle Button */}
//         <button
//           className="btn btn-circle btn-ghost fixed top-4 right-4 z-50 text-2xl"
//           onClick={toggleTheme}
//         >
//           {theme === "light" ? "🌙" : "☀️"}
//         </button>

//         {/* Main Content Area */}
//         <main className="flex-grow">
//           <Routes>
//             {/* Landing Page Route */}
//             <Route
//               path="/"
//               element={!authUser ? <LandingPage /> : <Navigate to="/chat" />}
//             />

//             {/* Auth Routes */}
//             <Route
//               path="/login"
//               element={!authUser ? <LoginPage /> : <Navigate to="/chat" />}
//             />
//             <Route
//               path="/signup"
//               element={!authUser ? <SignupPage /> : <Navigate to="/chat" />}
//             />

//             {/* Protected Chat Route */}
//             <Route
//               path="/chat"
//               element={authUser ? <ChatPage /> : <Navigate to="/login" />}
//             />
//           </Routes>
//         </main>

//         {/* Toast Container for notifications */}
//         <Toaster />
//       </div>
//     </Router>
//   );
// }

// export default App;

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
  // We removed useTheme here because it's now handled by the LandingPage
  // and persists its setting via the hook.

  return (
    <Router>
      {/* We apply the dark/light mode classes at the root 
          (our useTheme hook handles this on the <html> tag)
          so we just need a basic container.
      */}
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
        {/* We removed the floating theme toggle button */}

        {/* Main Content Area */}
        <main className="flex-grow">
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
        </main>

        {/* Toast Container for notifications */}
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
