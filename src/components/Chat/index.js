import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Divider, Grid } from "@material-ui/core";
import ScrollToBottom from "react-scroll-to-bottom";

import classNames from "classnames";
import { GlobalContext } from "../../Context/global";
import Message from "./Message";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  item: {
    padding: theme.spacing(1, 2),
  },
  chat: {
    height: "calc(100vh - 200px)",
  },
  listening: {
    ...theme.typography.button,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
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
    <Paper className={classes.root}>
      <Grid container direction="column">
        <Grid item className={classes.item}>
          <Typography variant="h6">Área de comando de voz</Typography>
        </Grid>
        <Divider variant="fullWidth" />
        <ScrollToBottom className={classes.chat}>
          <Grid item className={classNames(classes.item)}>
            {state.messages.map((v) => {
              return <Message {...v} />;
            })}
          </Grid>
        </ScrollToBottom>
        <Grid item>
          <Typography className={classes.listening}>
            {listening && "Ouvindo..."}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
