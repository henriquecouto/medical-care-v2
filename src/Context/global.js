import React, { createContext, useState, useEffect, useCallback } from "react";
import { login, logout, checkLogin } from "./Actions/auth";
import API from "../utils/API";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [state, setState] = useState({
    user: { status: false },
    messages: [],
    listening: false,
    patients: [],
  });

  const isLogged = async () => {
    const user = await checkLogin();
    login(setState)(user);
  };

  const loadPatients = useCallback(async () => {
    if (state.user.status) {
      try {
        const { data } = await API.get("/patients", {
          headers: { Authorization: `Bearer ${state.user.token}` },
        });
        setState((prev) => ({
          ...prev,
          patients: data.data,
        }));
      } catch (error) {
        alert("Não foi possível carregar os pacientes");
      }
    }
  }, [state.user]);

  useEffect(() => {
    isLogged();
  }, []);

  useEffect(() => {
    loadPatients();
  }, [loadPatients]);

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
