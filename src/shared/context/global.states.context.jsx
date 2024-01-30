import { createContext, useContext, useState } from 'react';

export const Context = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalStates = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('please, use Provider');
  }
  return context;
};

// eslint-disable-next-line react/prop-types
const GlobalStates = ({ ws, children }) => {
  const [theme, setCurrentTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const contextValue = {
    ws,
    theme,
    toggleTheme,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default GlobalStates;
