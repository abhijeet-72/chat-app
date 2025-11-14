import { useEffect, useState } from "react";

/**
 * Custom hook to manage the application's theme (light/dark).
 * It persists the theme in localStorage and toggles the 'dark'
 * class on the <html> element.
 */
const useTheme = () => {
  // 1. Initialize state from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  // 2. Effect to apply the theme to the <html> tag
  useEffect(() => {
    const htmlElement = document.documentElement;

    // Remove old theme class and add the new one
    if (theme === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }

    // Save the theme to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]); // Rerun this effect when the theme state changes

  // 3. Toggle function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // 4. Return theme state and toggle function
  return { theme, toggleTheme };
};

export default useTheme;
