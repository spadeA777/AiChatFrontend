import React, { useState, ReactNode } from 'react';
import AppContext from './AppContext';
import { AppConfig } from './ConfigManager';
import { AppAuth } from './AuthManager';

interface Props {
  children: ReactNode;
}

const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [config] = useState(AppConfig);
  const [auth] = useState(AppAuth);

  const contextData = {
    config: config,
    auth: auth
  }

  return (
    <AppContext.Provider value={contextData}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;