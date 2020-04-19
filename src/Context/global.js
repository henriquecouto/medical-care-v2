import React, { createContext, useState, useEffect, useCallback } from "react";
import { login, logout, checkLogin } from "./Actions/auth";
import API from "../utils/API";
import { startAppointment, add, remove, finalize } from "./Actions/appointment";
import { Redirect, useHistory, useRouteMatch } from "react-router-dom";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    messages: [],
    listening: false,
    patients: [],
    appointment: null,
    redirect: "",
  });
  const history = useHistory();

  const isLogged = async () => {
    const user = await checkLogin();
    login(setState)(user);
  };

  const loadPatients = useCallback(async () => {
    if (state.user) {
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

  useEffect(() => {
    if (state.redirect) {
      history.push(state.redirect);
    }
  }, [state.redirect, history]);

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

  const patient = {
    show: (patientIndex, callback) => {
      const patient = state.patients[patientIndex];
      if (patient) {
        setState((prev) => ({
          ...prev,
          redirect: `/app/paciente/${patient._id}`,
        }));
      } else {
        callback("Paciente não encontrado");
      }
    },
  };

  const user = {
    login: login(setState),
    logout,
  };

  const appointment = {
    start: startAppointment(state, setState),
    add: add(setState),
    remove: remove(setState),
    finalize: finalize(setState),
  };

  const actions = { message, listening, user, appointment, patient };

  return (
    <GlobalContext.Provider value={[state, actions]}>
      {children}
    </GlobalContext.Provider>
  );
};
