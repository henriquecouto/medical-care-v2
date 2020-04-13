import React from "react";
import Card from "../Card";
import {
  Typography,
  Chip,
  Grid,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Table,
  TableHead,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflow: "auto",
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

export default function Clinical({
  exams,
  patient: { familyHistory },
  symptons,
  diagnosis,
  treatment,
}) {
  const classes = useStyles();
  return (
    <Card title="Dados clínicos">
      {JSON.stringify({ familyHistory })}
      <br />
      <Items name="Exames" items={exams} />
      <Items name="Sintomas" items={symptons} />
      <Items name="Diagnósticos" items={diagnosis} />

      <Grid container>
        <Typography variant="h6" style={{ marginRight: 10 }}>
          Tratamento
        </Typography>
        {!!treatment.length && (
          <Paper className={classes.medication}>
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
    </Card>
  );
}
