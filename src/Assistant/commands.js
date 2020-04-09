export default (assistant, addMessage) => {
  const say = (speech) => {
    assistant.say(speech, {
      onStart: function () {
        addMessage({ content: speech, sender: "assistant" });
      },
    });
  };
  assistant.redirectRecognizedTextOutput((content, isFinal) => {
    if (isFinal) {
      addMessage({ content, sender: "doctor" });
    }
  });

  assistant.on(["está aí*"], true).then(() => {
    assistant.dontObey();
    say("Olá");
  });

  assistant.on("*", true).then(() => {
    assistant.dontObey();
    say("Não entendo esse comando");
  });
};
