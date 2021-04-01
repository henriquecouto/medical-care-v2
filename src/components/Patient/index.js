/* eslint-disable no-restricted-globals */
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
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalContext } from "../../Context/global";
import { useCallback } from "react";
import Appointment from "../Appointment";
import Demographic from "../Demographic";
import Axios from "axios";
import { encrypt } from "../../utils/crypto";
import routes from "../../constants/routes";

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

const AllowAccessModal = ({ appointment, onClose }) => {
  const [{ user, api }] = useContext(GlobalContext);
  const [form, setForm] = useState({
    applicationAddress: `${location.origin}${routes.externalAccess}`,
    contractAddress: appointment.blockedContractAddress,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form };
    data.accountAddress = encrypt("0xbcb9670df202256b07852a802A540F18DBf8A9e4");
    data.allowUntil = Date.parse(data.allowUntil) / 1000;
    const result = await Axios.post(`${api}/appointments/allow-access`, data, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    console.log({ result });
  };

  return (
    <Dialog open={!!appointment} onClose={onClose}>
      <DialogTitle>Liberar acesso temporário o atendimento</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent dividers>
          <Grid container direction="column" spacing={2}>
            <Grid item xs>
              <TextField
                fullWidth
                variant="outlined"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={({ target: { value } }) =>
                  setForm((old) => ({ ...old, email: value }))
                }
              />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Conta"
                value={form.accountAddress}
                onChange={({ target: { value } }) =>
                  setForm((old) => ({ ...old, accountAddress: value }))
                }
              />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                variant="outlined"
                type="date"
                placeholder="Data limite"
                value={form.allowUntil}
                onChange={({ target: { value } }) =>
                  setForm((old) => ({ ...old, allowUntil: value }))
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Pronto
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default function () {
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [allowAccessModal, setAllowAccessModal] = useState({
    appointment: null,
  });
  const { patientId } = useParams();
  const [{ user, api }] = useContext(GlobalContext);

  const classes = useStyles();

  const loadAppointments = useCallback(async () => {
    if (api) {
      try {
        const {
          data: { data },
        } = await Axios.get(`${api}/patients/${patientId}/appointments`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setAppointments(data);
      } catch (error) {}
    }
  }, [patientId, user.token, api]);

  const loadPatient = useCallback(async () => {
    try {
      const {
        data: { data },
      } = await Axios.get(`${api}/patients/${patientId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setPatient(data);
    } catch (error) {}
  }, [patientId, user.token, api]);

  useEffect(() => {
    loadPatient();
    loadAppointments();
  }, [loadAppointments, loadPatient]);

  if (patient) {
    return (
      <div className={classes.root}>
        {allowAccessModal.appointment && (
          <AllowAccessModal
            appointment={allowAccessModal.appointment}
            onClose={() => setAllowAccessModal({ appointment: null })}
          />
        )}
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
                <Appointment
                  data={v}
                  allowAccess={(appointment) =>
                    setAllowAccessModal({ appointment })
                  }
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
  return <Typography>Paciente não encontrado</Typography>;
}
