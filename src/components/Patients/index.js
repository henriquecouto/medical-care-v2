import React, { useContext } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { GlobalContext } from "../../Context/global";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflow: "auto",
    height: "calc(100vh - 155px)",
  },
  table: {
    minWidth: 650,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

const TableItem = ({ value }) => {
  const birthDate = new Date(value.birthDate);
  return (
    <TableRow>
      <TableCell>{value.i + 1}</TableCell>
      <TableCell>{value.user.name}</TableCell>
      <TableCell>{value.gender}</TableCell>
      <TableCell>{`${birthDate.getDate()} - ${
        birthDate.getMonth() + 1
      } - ${birthDate.getFullYear()}`}</TableCell>
      <TableCell>{value.occupation}</TableCell>
    </TableRow>
  );
};

export default function Patients() {
  const classes = useStyles();
  const [{ appointment, patients }] = useContext(GlobalContext);

  if (appointment) {
    return <Redirect to="/atendimento" />;
  }

  return (
    <>
      <Typography variant="h6" className={classes.title}>
        Pacientes
      </Typography>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Índice</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Sexo</TableCell>
              <TableCell>Data de Nascimento</TableCell>
              <TableCell>Profissão</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((v, i) => (
              <TableItem value={{ ...v, i }} key={v._id} />
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}
