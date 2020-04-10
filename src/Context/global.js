import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [state, setState] = useState({
    messages: [],
    listening: false,
  });

  const message = {};

  message.add = (message) => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, { ...message, key: prev.messages.length }],
    }));
  };

  const listening = {
    set: (value) => setState((prev) => ({ ...prev, listening: value })),
  };

  const actions = { message, listening };

  return (
    <GlobalContext.Provider value={[state, actions]}>
      {children}
    </GlobalContext.Provider>
  );
};
