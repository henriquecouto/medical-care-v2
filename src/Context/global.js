import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [state, setState] = useState({
    messages: [],
  });

  const message = {};

  message.add = (message, setGlobalState) => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, { ...message, key: prev.messages.length }],
    }));
  };

  const actions = { message };

  return (
    <GlobalContext.Provider value={[state, actions]}>
      {children}
    </GlobalContext.Provider>
  );
};
