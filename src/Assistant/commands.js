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
        appointment.start(
          patient === "  um" ? 0 : Number(patient) - 1,
          (error) => say(error)
        )
      );
    });

  assistant.on(["adiciona o exame *"], true).then((i, exam) => {
    assistant.dontObey();
    say("Adicionando exame " + exam, () =>
      appointment.addExam("exam", (error) => say(error))
    );
  });

  assistant.on("*", true).then(() => {
    assistant.dontObey();
    say("Olá, não entendi esse comando");
  });
};
