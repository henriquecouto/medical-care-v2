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

export const addExam = (state, setState) => (exam, callback) => {
  // console.log(state.appointment);
};
