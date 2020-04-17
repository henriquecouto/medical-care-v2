import React, { useContext } from "react";
import { GlobalContext } from "../../Context/global";
import { Redirect } from "react-router-dom";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Demographic from "../Demographic";
import Clinical from "./Clinical";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

export default function MakeAppointment() {
  const [{ appointment }] = useContext(GlobalContext);
  const classes = useStyles();

  if (!appointment) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Demographic patient={appointment.patient} />
      <Divider className={classes.divider} />
      <Clinical {...appointment} />
    </>
  );
}
