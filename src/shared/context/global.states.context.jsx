import { createContext, useContext, useEffect, useState } from 'react';
import { connectWebsocket } from '../../websocketManager';

const Context = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalStates = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useWebsocket must be used within a WebsocketProvider');
  }
  return context;
};

// eslint-disable-next-line react/prop-types
const GlobalStates = ({ ws, children }) => {
  const contextValue = {
    ws,
    connectWebsocket,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default GlobalStates;
