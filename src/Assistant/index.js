import React, { useEffect, Children, cloneElement, useContext } from "react";
import Artyom from "artyom.js";
import commands from "./commands";
import { GlobalContext } from "../Context/global";

const assistant = new Artyom();

export default function Assistent({ children, lang }) {
  const [{ listening }, actions] = useContext(GlobalContext);
  const renderChildren = () => {
    return Children.map(children, (child) => {
      return cloneElement(child);
    });
  };

  useEffect(() => {
    assistant
      .initialize({
        lang,
        continuous: true,
        soundex: true,
        debug: true,
        speed: 0.9,
        executionKeyword: "Olívia",
        obeyKeyword: "Olívia",
        listen: true,
        name: "Olívia",
        mode: "normal",
      })
      .then(() => {
        assistant.dontObey();
      })
      .catch((err) => {
        console.error("Artyom couldn't be initialized: ", err);
      });
  }, [lang, listening]);

  useEffect(() => {
    commands(assistant, actions);
  }, [actions]);

  return <div>{renderChildren()}</div>;
}
