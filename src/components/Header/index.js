import React, { useContext } from "react";
import {
  Typography,
  Toolbar,
  AppBar,
  Grid,
  CssBaseline,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalContext } from "../../Context/global";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

export default function Header({ children }) {
  const classes = useStyles();
  const [, actions] = useContext(GlobalContext);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Grid container alignItems="center">
                <Typography variant="h6">Medical Care</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Button onClick={actions.user.logout} color="inherit">
                Sair
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
