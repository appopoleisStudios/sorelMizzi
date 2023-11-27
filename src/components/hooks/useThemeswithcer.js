import React, { useEffect, useState } from 'react'

const useThemeSwitcher = () => {
  const preferDarkQuery = "(prefer-color-scheme:dark)";
  // Initialize mode state without a value since `window` is not available server-side
  const [mode, setMode] = useState(null);

  useEffect(() => {
    // Set the initial theme based on the user preference or system preference
    const storedTheme = window.localStorage.getItem("theme");
    const systemPreference = window.matchMedia(preferDarkQuery).matches ? "dark" : "light";
    const initialTheme = storedTheme || systemPreference;
    
    setMode(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Add event listener for system preference changes
    const mediaQuery = window.matchMedia(preferDarkQuery);
    const handleChange = (e) => {
      const newMode = e.matches ? "dark" : "light";
      setMode(newMode);
      window.localStorage.setItem("theme", newMode);
      if (newMode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    // Only update the localStorage and class if mode is set
    if (mode) {
      window.localStorage.setItem("theme", mode);
      if (mode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [mode]);

  return [mode, setMode];
}

export default useThemeSwitcher;
