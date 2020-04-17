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

const Items = ({ name, items = [] }) => {
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

const Parent = ({ relationship, condition, note }) => {
  return (
    <TableRow>
      <TableCell>{condition}</TableCell>
      <TableCell>{relationship}</TableCell>
      <TableCell>{note}</TableCell>
    </TableRow>
  );
};

export default function Clinical({
  exams,
  patient: { familyHistory },
  symptoms,
  diagnosis,
  treatment,
}) {
  const classes = useStyles();
  return (
    <Card title="Dados clínicos">
      <Grid container>
        <Typography variant="h6" style={{ marginRight: 10 }}>
          Histórico Familiar:
        </Typography>
        {!!familyHistory.length && (
          <Paper>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Relação</TableCell>
                  <TableCell>Condição</TableCell>
                  <TableCell>Nota</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {familyHistory.map((parent, i) => {
                  return <Parent {...parent} key={i} />;
                })}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Grid>
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
    </Card>
  );
}
