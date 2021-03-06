export default (assistant, { message, user, appointment, patient }) => {
  const say = (speech, onEnd) => {
    assistant.say(speech, {
      onStart: function () {
        message.add({ content: speech, sender: "assistant" });
      },
      onEnd,
    });
  };

  assistant.redirectRecognizedTextOutput((content, isFinal) => {
    // assistant.dontObey();
    if (isFinal) {
      message.add({ content, sender: "doctor" });
    }
  });

  assistant
    .on(
      [
        "finalize o atendimento*",
        "finalizar atendimento*",
        "finaliza o atendimento*",
        "finalize atendimento*",
        "finaliza atendimento*",
      ],
      true
    )
    .then(() => {
      assistant.dontObey();
      say("Finalizando atendimento", () => appointment.finalize(say));
    });

  assistant.on(["está aí*"], true).then(() => {
    assistant.dontObey();
    say("Olá");
  });

  assistant.on(["saia da minha conta*"], true).then(() => {
    assistant.dontObey();
    say("Saindo da sua conta, um momento...", () => user.logout());
  });

  assistant
    .on(
      [
        "prepara um atendimento para o paciente número*",
        "prepare um atendimento para o paciente número*",
        "prepara atendimento para o paciente número*",
        "prepara um atendimento para paciente número*",
        "prepara atendimento para paciente número*",
        "prepare atendimento para o paciente número*",
        "prepare um atendimento para paciente número*",
        "prepare atendimento para paciente número*",
      ],
      true
    )
    .then((i, patient) => {
      assistant.dontObey();
      say("Preparando atendimento, um momento...", () =>
        appointment.start(patient === "  um" ? 0 : Number(patient) - 1, say)
      );
    });

  assistant
    .on(
      [
        "adiciona o exame *",
        "adicione o exame *",
        "adiciona exame *",
        "adicione exame *",
      ],
      true
    )
    .then((i, exam) => {
      assistant.dontObey();
      say("Adicionando exame " + exam, () =>
        appointment.add(exam, "exams", say)
      );
    });

  assistant
    .on(
      [
        "remova o exame *",
        "remove o exame *",
        "remova exame *",
        "remove exame *",
      ],
      true
    )
    .then((i, exam) => {
      assistant.dontObey();
      say("Removendo exame " + exam, () =>
        appointment.remove(exam, "exams", say)
      );
    });

  assistant
    .on(
      [
        "o paciente relatou *",
        "paciente relatou *",
        "adiciona o sintoma *",
        "adiciona sintoma *",
        "adicione o sintoma *",
        "adicione sintoma *",
      ],
      true
    )
    .then((i, symptom) => {
      assistant.dontObey();
      say("Adicionando sintoma " + symptom, () =>
        appointment.add(symptom, "symptoms", say)
      );
    });

  assistant
    .on(
      [
        "remova o sintoma *",
        "remova sintoma *",
        "remove o sintoma *",
        "remove sintoma *",
      ],
      true
    )
    .then((i, symptom) => {
      assistant.dontObey();
      say("Removendo sintoma " + symptom, () =>
        appointment.remove(symptom, "symptoms", say)
      );
    });

  assistant
    .on(
      [
        "adiciona o diagnóstico *",
        "adicione o diagnóstico *",
        "adiciona diagnóstico *",
        "adicione diagnóstico *",
      ],
      true
    )
    .then((i, diagnosi) => {
      assistant.dontObey();
      say("Adicionando diagnóstico " + diagnosi, () =>
        appointment.add(diagnosi, "diagnosis", say)
      );
    });

  assistant
    .on(
      [
        "remova o diagnóstico *",
        "remova diagnóstico *",
        "remove o diagnóstico *",
        "remove diagnóstico *",
      ],
      true
    )
    .then((i, diagnosi) => {
      assistant.dontObey();
      say("Removendo diagnóstico " + diagnosi, () =>
        appointment.remove(diagnosi, "diagnosis", say)
      );
    });

  // o paciente deve tomar [remedio] a cada [] horas [] vezes
  assistant
    .on(["o paciente deve tomar *", "paciente deve tomar *"], true)
    .then((i, text) => {
      assistant.dontObey();
      const textArray = text.split(" ").filter((v) => v !== "");
      const medication = {};
      let nameOk = false;

      for (i in textArray) {
        if (textArray[i].toLowerCase() === "a") nameOk = true;
        if (!nameOk) {
          medication.name = medication.name
            ? `${medication.name} ${textArray[i]}`
            : textArray[i];
          console.log("1", textArray[i]);
        } else {
          const number = Number(textArray[i]);
          if (!medication.interval) {
            medication.interval = number;
          } else if (!medication.recurrencies) {
            medication.recurrencies = number;
          }
        }
      }

      say("Adicionando medicação", () =>
        appointment.add(medication, "treatment", say)
      );
    });

  assistant
    .on(
      [
        "remova o remédio *",
        "remova remédio *",
        "remove o remédio *",
        "remove remédio *",
      ],
      true
    )
    .then((i, medicationName) => {
      assistant.dontObey();
      say("Removendo medicação " + medicationName, () =>
        appointment.remove(medicationName.split(" ")[1], "treatment", say)
      );
    });

  assistant
    .on(
      [
        "mostra o paciente número*",
        "mostra paciente número*",
        "mostre o paciente número*",
        "mostre paciente número*",
      ],
      true
    )
    .then((i, patientIndex) => {
      assistant.dontObey();
      say("Buscando dados do paciente...", () =>
        patient.show(
          patientIndex === "  um" ? 0 : Number(patientIndex) - 1,
          say
        )
      );
    });

  assistant.on("*", true).then(() => {
    assistant.dontObey();
    say("Olá, não entendi esse comando");
  });
};
