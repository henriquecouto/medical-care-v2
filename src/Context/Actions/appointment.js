import API from "../../utils/API";

const appointmentBase = {
  exams: [],
  symptoms: [],
  diagnosis: [],
  treatment: [],
};

export const startAppointment = (state, setState) => (
  patientIndex,
  callback
) => {
  const patient = state.patients[patientIndex];
  if (patient) {
    setState((prev) => ({
      ...prev,
      appointment: { ...appointmentBase, patient },
      redirect: "/app/atendimento",
    }));
  } else {
    callback("Paciente não encontrado");
  }
};

export const add = (setState) => (item, field, callback) => {
  setState((prev) => {
    if (!prev.appointment) {
      callback("O atendimento não foi iniciado");
      return prev;
    }
    const items = prev.appointment[field] || [];
    items.push(item);
    prev.appointment[field] = items;
    return { ...prev };
  });
};

export const remove = (setState) => (item, field, callback) => {
  setState((prev) => {
    if (!prev.appointment) {
      callback("O atendimento não foi iniciado");
      return prev;
    }
    let items;
    if (field === "treatment") {
      items = prev.appointment[field].filter((v) => v.name !== item);
    } else {
      items = prev.appointment[field].filter((v) => v !== item);
    }

    console.log(items, item);

    prev.appointment[field] = items;
    return { ...prev };
  });
};

export const finalize = (setState) => async (callback) => {
  let state;

  setState((prev) => {
    state = prev;
    console.log(prev);
    return { ...prev };
  });

  if (!state.appointment) {
    return callback("O atendimento não foi iniciado");
  }

  const appointment = {
    ...state.appointment,
    patient: state.appointment.patient._id,
    doctor: state.user.data._id,
  };

  try {
    await API.post("/appointments", appointment, {
      headers: { Authorization: `Bearer ${state.user.token}` },
    });
    setState((prev) => ({
      ...prev,
      appointment: null,
      redirect: `/app/paciente/${appointment.patient}`,
    }));
  } catch (error) {
    callback("Ocorreu um erro ao finalizar o atendimento");
  }
};
