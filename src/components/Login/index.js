import React, { useState, useContext, useEffect } from "react";
import { Paper, Typography, Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getUrl } from "../../utils/API";
import CustomAlert from "../CustomAlert";
import { GlobalContext } from "../../Context/global";
import Axios from "axios";

const errors = {
  "user not found": "Usuário não encontrado!",
};

const useStyles = makeStyles((theme) => ({
  background: {
    height: "100vh",
    background: theme.palette.secondary.light,
  },
  root: {
    maxWidth: 500,
    width: "100%",
    padding: theme.spacing(4, 0),
  },
  container: {
    padding: theme.spacing(2),
  },
  input: {
    color: theme.palette.text.primary,
  },
  title: {
    marginBottom: theme.spacing(4),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [, { user, listening }] = useContext(GlobalContext);

  const [form, setForm] = useState({ login: "", password: "" });
  const [error, setError] = useState({ status: false, message: "" });
  const [api, setApi] = useState("");

  useEffect(() => {
    getUrl(setApi);
  }, []);

  const clearResult = () => setError({ status: false });

  const handleForm = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post(`${api}/auth/login`, form);
      listening.set(true);
      user.login(data);
    } catch (e) {
      const {
        response: { data },
      } = e;
      setError({ status: true, message: errors[data.message] });
    }
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      className={classes.background}
    >
      <CustomAlert
        open={error.status}
        handle={clearResult}
        severity="error"
        message={error.message}
      />
      <Paper className={classes.root} elevation={1}>
        <Grid container className={classes.container} justify="center">
          <Typography variant="h4" className={classes.title}>
            Fazer login no Medical Care
          </Typography>
          <form onSubmit={login} className={classes.form}>
            <TextField
              className={classes.input}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              name="login"
              autoComplete="username"
              autoFocus
              onChange={handleForm}
              value={form.email}
            />
            <TextField
              className={classes.input}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleForm}
              value={form.password}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Entrar
            </Button>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
}
