export const addMessage = (message, setGlobalState) => {
  setGlobalState((prev) => ({
    ...prev,
    messages: [...prev.messages, { ...message, key: prev.messages.length }],
  }));
};
