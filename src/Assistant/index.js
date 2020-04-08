import React, { useEffect, Children, cloneElement } from "react";
import Artyom from "artyom.js";
import commands from "./commands";

const assistant = new Artyom();

export default function Assistent({ children, lang, active }) {
  const renderChildren = () => {
    return Children.map(children, (child) => {
      return cloneElement(child);
    });
  };

  useEffect(() => {
    if (active) {
      assistant
        .initialize({
          lang,
          continuous: false,
          soundex: true,
          debug: true,
          executionKeyword: "Assistente",
          obeyKeyword: "Assistente",
          listen: true,
          name: "Assistente",
        })
        .then(() => {
          assistant.say("Olá!");
        })
        .catch((err) => {
          console.error("Artyom couldn't be initialized: ", err);
        });

      commands(assistant);
    }
  }, [lang, active]);

  return <div>{renderChildren()}</div>;
}
