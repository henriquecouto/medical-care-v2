import React, { useEffect, Children, cloneElement, useContext } from "react";
import Artyom from "artyom.js";
import commands from "./commands";
import { GlobalContext } from "../Context/global";

const assistant = new Artyom();

export default function Assistent({ children, lang, active }) {
  const [, actions] = useContext(GlobalContext);
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
          continuous: true,
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
    }
  }, [lang, active]);

  useEffect(() => {
    commands(assistant, actions.message.add);
  }, [actions.message.add]);

  return <div>{renderChildren()}</div>;
}
