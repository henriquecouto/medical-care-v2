export default (assistant, { message, user, appointment }) => {
  const say = (speech, onEnd) => {
    assistant.say(speech, {
      onStart: function () {
        message.add({ content: speech, sender: "assistant" });
      },
      onEnd,
    });
  };

  assistant.redirectRecognizedTextOutput((content, isFinal) => {
    if (isFinal) {
      message.add({ content, sender: "doctor" });
    }
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
    .on(["prepara um atendimento para o paciente número*"], true)
    .then((i, patient) => {
      assistant.dontObey();
      say("Preparando atendimento, um momento...", () =>
        appointment.start(patient === "  um" ? 0 : Number(patient) - 1, say)
      );
    });

  assistant.on(["adiciona o exame *"], true).then((i, exam) => {
    assistant.dontObey();
    say("Adicionando exame " + exam, () => appointment.add(exam, "exams", say));
  });

  assistant.on(["remova o exame *"], true).then((i, exam) => {
    assistant.dontObey();
    say("Removendo exame " + exam, () =>
      appointment.remove(exam, "exams", say)
    );
  });

  assistant.on(["adiciona o sintoma *"], true).then((i, sympton) => {
    assistant.dontObey();
    say("Adicionando sintoma " + sympton, () =>
      appointment.add(sympton, "symptons", say)
    );
  });

  assistant.on(["remova o sintoma *"], true).then((i, sympton) => {
    assistant.dontObey();
    say("Removendo sintoma " + sympton, () =>
      appointment.remove(sympton, "symptons", say)
    );
  });

  assistant.on(["adiciona o diagnóstico *"], true).then((i, diagnosi) => {
    assistant.dontObey();
    say("Adicionando diagnóstico " + diagnosi, () =>
      appointment.add(diagnosi, "diagnosis", say)
    );
  });

  assistant.on(["remova o diagnóstico *"], true).then((i, diagnosi) => {
    assistant.dontObey();
    say("Removendo diagnóstico " + diagnosi, () =>
      appointment.remove(diagnosi, "diagnosis", say)
    );
  });

  assistant.on("*", true).then(() => {
    assistant.dontObey();
    say("Olá, não entendi esse comando");
  });
};
