export default (assistant, { message, user }) => {
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

  assistant.on(["prepara um atendimento para o paciente*"], true).then(() => {
    assistant.dontObey();
    say("Preparando atendimento, um momento...");
  });

  assistant.on("*", true).then(() => {
    assistant.dontObey();
    say("Olá, não entendi esse comando");
  });
};
