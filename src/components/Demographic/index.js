import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../Card";
import { Grid, Avatar, Typography } from "@material-ui/core";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2),
  },
  avatar: {
    // margin: 10,
    width: 150,
    height: 150,
    fontSize: 75,
  },
  item: {
    margin: "10px 40px 10px 0",
  },
  first: {
    minWidth: 400,
    maxWidth: 800,
  },
}));

export default function Demographic({ patient }) {
  const classes = useStyles();
  const birthDate = new Date(patient.birthDate);
  return (
    <Card title="Dados demográficos">
      <Grid container>
        <Grid item className={classes.item}>
          {patient.avatar ? (
            <Avatar
              alt={`avatar ${patient.user.name}`}
              src="/static/images/avatar/1.jpg"
              className={classes.avatar}
            />
          ) : (
            <Avatar className={classes.avatar}>
              {patient.user?.name[0].toUpperCase()}
            </Avatar>
          )}
        </Grid>

        <Grid item className={classes.item} xs>
          <Grid container alignItems="center">
            <Typography
              variant="h4"
              className={classNames(classes.item, classes.first)}
            >
              {patient.user?.name.toUpperCase()}
            </Typography>
            <Typography variant="body1" className={classes.item}>
              Data de nascimento:{" "}
              {`${birthDate.getDate()} - ${
                birthDate.getMonth() + 1
              } - ${birthDate.getFullYear()}`}
            </Typography>
          </Grid>
          <Grid container alignItems="center">
            <Typography
              variant="body1"
              className={classNames(classes.item, classes.first)}
            >
              Profissão: {patient.occupation.toUpperCase()}
            </Typography>
            <Typography variant="body1" className={classes.item}>
              Sexo: {patient.gender}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
