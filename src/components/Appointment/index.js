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
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import {
  Help as HelpIcon,
  ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

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

export default function Appointment({
  data: { exams, symptoms, diagnosis, treatment, blocked, ...others },
}) {
  const classes = useStyles();

  console.log(others);

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
    </Paper>
  );
}
