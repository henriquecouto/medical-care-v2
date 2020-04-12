import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import ScrollToBottom from "react-scroll-to-bottom";

import Card from "../Card";
import { GlobalContext } from "../../Context/global";
import Message from "./Message";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  chat: {
    height: "calc(100vh - 220px)",
  },
  listening: {
    ...theme.typography.button,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.third,
    padding: theme.spacing(1),
    borderRadius: 3,
    marginTop: theme.spacing(1),
    textAlign: "center",
  },
}));

export default function Chat() {
  const classes = useStyles();
  const [state, { listening }] = useContext(GlobalContext);

  return (
    <Card title="Área de comando de voz">
      <ScrollToBottom className={classes.chat}>
        {state.messages.map((v) => {
          return <Message {...v} />;
        })}
      </ScrollToBottom>
      <Typography className={classes.listening}>
        {listening && "Ouvindo..."}
      </Typography>
    </Card>
  );
}
