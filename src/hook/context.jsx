import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';

// Create a context for the theme
export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // State to hold the current theme mode ('light' or 'dark')
  const [mode, setMode] = useState('light');

  // Function to toggle between light and dark mode



  // Use useEffect to persist the theme mode in localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setMode(storedTheme);
    }
  }, []);

  // Update localStorage whenever mode changes
  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  return (
        {children}
  );
};

export default ThemeProvider;
