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
  IconButton,
  Tooltip,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Help as HelpIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    padding: theme.spacing(2),
    width: "100%",
  },
  table: {
    minWidth: 650,
  },
  allowAccessButton: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const Items = ({ name, items }) => {
  return (
    <Grid container alignItems="center" style={{ marginBottom: 10 }}>
      <Typography variant="h6" style={{ marginRight: 10 }}>
        {name}:{" "}
      </Typography>
      {items?.map((exam, index) => (
        <Chip key={index} label={exam} />
      ))}
    </Grid>
  );
};

const Medication = ({ name, interval, recurrencies, initialDate }) => {
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{interval}</TableCell>
      <TableCell>{recurrencies}</TableCell>
      <TableCell>{initialDate}</TableCell>
    </TableRow>
  );
};

export default function Appointment({ data, allowAccess }) {
  const { exams, symptoms, diagnosis, treatment, blocked } = data;
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
        {!!treatment?.length && (
          <Paper>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Medicação</TableCell>
                  <TableCell>Intervalo</TableCell>
                  <TableCell>Repetições</TableCell>
                  <TableCell>Data de Início</TableCell>
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
      <Grid container alignItems="center" style={{ marginTop: 10 }}>
        <Typography variant="h6">Bloqueado: </Typography>
        <Tooltip title="Indica se o atendimento já foi armazenado de modo seguro">
          <IconButton size="small">
            <HelpIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Typography style={{ marginLeft: 5 }}>
          {blocked ? "Sim" : "Não"}
        </Typography>
      </Grid>
      {blocked && (
        <Button
          variant="contained"
          color="primary"
          className={classes.allowAccessButton}
          onClick={() => allowAccess(data)}
        >
          Liberar Acesso
        </Button>
      )}
    </Paper>
  );
}
