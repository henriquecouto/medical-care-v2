import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import API from "../../utils/API";
import { GlobalContext } from "../../Context/global";
import { useCallback } from "react";
import Appointment from "../Appointment";
import Demographic from "../Demographic";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "calc(100vh - 90px)",
    overflowY: "auto",
  },
  grid: {
    width: "100%",
  },
  table: {
    width: "100%",
  },
}));

const Parent = ({ relationship, condition, note }) => {
  return (
    <TableRow>
      <TableCell>{condition}</TableCell>
      <TableCell>{relationship}</TableCell>
      <TableCell>{note}</TableCell>
    </TableRow>
  );
};

export default function () {
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const { patientId } = useParams();
  const [{ user }] = useContext(GlobalContext);

  const classes = useStyles();

  const loadAppointments = useCallback(async () => {
    try {
      const {
        data: { data },
      } = await API.get(`/patients/${patientId}/appointments`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setAppointments(data);
    } catch (error) {}
  }, [patientId, user.token]);

  const loadPatient = useCallback(async () => {
    try {
      const {
        data: { data },
      } = await API.get(`/patients/${patientId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setPatient(data);
    } catch (error) {}
  }, [patientId, user.token]);

  useEffect(() => {
    loadPatient();
    loadAppointments();
  }, [loadAppointments, loadPatient]);

  if (patient) {
    return (
      <div className={classes.root}>
        <Grid container spacing={2} className={classes.grid} direction="column">
          {patient && (
            <>
              <Grid item>
                <Demographic patient={patient} />
              </Grid>
              <Grid item container>
                <Typography variant="h6" style={{ marginRight: 10 }}>
                  Histórico Familiar:
                </Typography>
                {!!patient.familyHistory.length && (
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
                        {patient.familyHistory.map((parent, i) => {
                          return <Parent {...parent} key={i} />;
                        })}
                      </TableBody>
                    </Table>
                  </Paper>
                )}
              </Grid>
            </>
          )}

          {appointments.map((v) => {
            return (
              <Grid item key={v._id}>
                <Appointment data={v} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
  return <Typography>Paciente não encontrado</Typography>;
}
