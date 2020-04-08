import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Divider, Grid } from "@material-ui/core";
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
    height: "calc(100vh - 160px)",
    overflow: "auto",
  },
}));

export default function Chat({}) {
  const classes = useStyles();
  const [state] = useContext(GlobalContext);

  return (
    <Paper className={classes.root}>
      <Grid container direction="column">
        <Grid item className={classes.item}>
          <Typography variant="h6">Área de comando de voz</Typography>
        </Grid>
        <Divider variant="fullWidth" />
        <Grid item className={classNames(classes.item, classes.chat)}>
          {state.messages.map((v) => {
            return <Message {...v} />;
          })}
        </Grid>
      </Grid>
    </Paper>
  );
}
