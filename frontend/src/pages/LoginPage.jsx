import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import useTheme from "../hooks/useTheme";

// --- ICONS ---
const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    <path
      fillRule="evenodd"
      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
      clipRule="evenodd"
    />
  </svg>
);
const EyeSlashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
    <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
    <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.471 5.705 7.697 10.677 7.697.492 0 .978-.032 1.455-.092l-3.435-3.435A5.257 5.257 0 0 1 6.75 12Z" />
  </svg>
);
const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path d="M11.47 3.84a.75.75 0 0 1 1.06 0l8.635 8.635a.75.75 0 1 1-1.06 1.06l-.375-.375v6.775a2.25 2.25 0 0 1-2.25 2.25h-2.916a.75.75 0 0 1-.75-.75V15.75a1.5 1.5 0 0 0-1.5-1.5h-2.25a1.5 1.5 0 0 0-1.5 1.5v5.685a.75.75 0 0 1-.75.75H5.25a2.25 2.25 0 0 1-2.25-2.25v-6.775l-.375.375a.75.75 0 0 1-1.06-1.06L11.47 3.84Z" />
  </svg>
);

const LoginPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  // --- State for Password Visibility ---
  const [showPassword, setShowPassword] = useState(false);

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(inputs);
  };

  const handleInputChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full p-4 relative">
      {/* --- HOME LINK (Top Left) --- */}
      <Link
        to="/"
        className="absolute top-4 left-4 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 text-xl z-10 flex items-center gap-2"
        title="Back to Home"
      >
        <HomeIcon />
        <span className="hidden sm:inline text-sm font-medium">Home</span>
      </Link>

      {/* Theme Toggle (Top Right) */}
      <button
        className="absolute top-4 right-4 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 text-2xl z-10"
        onClick={toggleTheme}
        title="Toggle Theme"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Sign In to FLUX
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="johndoe"
              value={inputs.username}
              onChange={handleInputChange}
            />
          </div>

          {/* --- PASSWORD INPUT --- */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle type
                name="password"
                className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 pr-10" // Added padding-right
                placeholder="••••••••"
                value={inputs.password}
                onChange={handleInputChange}
              />
              {/* Toggle Button */}
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 dark:text-gray-400 hover:text-blue-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Sign In"}
          </button>
        </form>

        <div className="text-sm text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
