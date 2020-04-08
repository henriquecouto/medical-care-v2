import { addMessage } from "./Actions/messages";

export default (assistant, setGlobalState) => {
  assistant.redirectRecognizedTextOutput((content, isFinal) => {
    if (isFinal) {
      addMessage({ content, sender: "doctor" }, setGlobalState);
    }
  });

  assistant.on(["está aí*"], true).then(() => {
    assistant.dontObey();
    let speech = "Olá";
    assistant.say(speech, {
      onStart: function () {
        addMessage({ content: speech, sender: "assistant" }, setGlobalState);
      },
    });
  });
};
