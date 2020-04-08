export default (assistant) => {
  assistant.on(["finalize o atendimento*"], true).then(() => {
    assistant.dontObey();

    let speech = "Finalizando atendimento...";

    assistant.say(speech);
  });
};
