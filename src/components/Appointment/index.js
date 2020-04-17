import React from "react";
import {
  Typography,
  Grid,
  Paper,
  TableRow,
  TableCell,
  Chip,
  Table,
  TableHead,
  TableBody,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: "100%",
  },
  table: {
    minWidth: 650,
  },
}));

const Items = ({ name, items }) => {
  return (
    <Grid container alignItems="center" style={{ marginBottom: 10 }}>
      <Typography variant="h6" style={{ marginRight: 10 }}>
        {name}:{" "}
      </Typography>
      {items.map((exam, index) => (
        <Chip key={index} label={exam} />
      ))}
    </Grid>
  );
};

const Medication = ({ name, interval, recurrencies }) => {
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{interval}</TableCell>
      <TableCell>{recurrencies}</TableCell>
    </TableRow>
  );
};

export default function Appointment({
  data: { exams, symptoms, diagnosis, treatment },
}) {
  const classes = useStyles();

  return (
    <Paper component={Grid} className={classes.root}>
      <Items name="Exames" items={exams} />
      <Items name="Sintomas" items={symptoms} />
      <Items name="Diagnósticos" items={diagnosis} />

      <Grid container>
        <Typography variant="h6" style={{ marginRight: 10 }}>
          Tratamento:
        </Typography>
        {!!treatment.length && (
          <Paper>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Medicação</TableCell>
                  <TableCell>Intervalo</TableCell>
                  <TableCell>Repetições</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {treatment.map((medication, i) => {
                  return <Medication {...medication} key={i} />;
                })}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Grid>
    </Paper>
  );
}
