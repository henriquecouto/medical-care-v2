const appointmentBase = {
  patient: null,
  exams: [],
  symptons: [],
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
    const items = prev.appointment[field];
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
