import React, { createContext, useState, useEffect } from "react";
import { login, logout, checkLogin } from "./Actions/auth";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [state, setState] = useState({
    user: { status: false },
    messages: [],
    listening: false,
  });

  const isLogged = async () => {
    const user = await checkLogin();
    login(setState)(user);
  };

  useEffect(() => {
    isLogged();
  }, []);

  const message = {
    add: (message) => {
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, { ...message, key: prev.messages.length }],
      }));
    },
  };

  const listening = {
    set: (value) => setState((prev) => ({ ...prev, listening: value })),
  };

  const user = {
    login: login(setState),
    logout,
  };

  const actions = { message, listening, user };

  return (
    <GlobalContext.Provider value={[state, actions]}>
      {children}
    </GlobalContext.Provider>
  );
};
