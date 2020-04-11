import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../Card";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2),
  },
}));

export default function Demographic() {
  const classes = useStyles();
  return <Card title="Dados demográficos"></Card>;
}
