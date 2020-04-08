export default (assistant) => {
  assistant.on(["está aí*"], true).then(() => {
    assistant.dontObey();
    assistant.say("Olá");
  });
};
