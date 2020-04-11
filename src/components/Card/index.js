import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Divider, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  item: {
    padding: theme.spacing(1, 2),
  },
}));

export default function Card({ children, title }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container direction="column">
        <Grid item className={classes.item}>
          <Typography variant="h6">{title}</Typography>
        </Grid>
        <Divider variant="fullWidth" />
        {children}
      </Grid>
    </Paper>
  );
}
