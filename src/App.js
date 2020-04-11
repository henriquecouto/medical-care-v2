import React, { useContext } from "react";
import Assistant from "./Assistant";
import { Grid, Divider, Button } from "@material-ui/core";
import Header from "./components/Header";
import Chat from "./components/Chat";
import { GlobalContext } from "./Context/global";
import Login from "./components/Login";
import Patients from "./components/Patients";

function App() {
  const [{ user, listening }, actions] = useContext(GlobalContext);

  if (!user.status) {
    return <Login />;
  }

  if (!listening) {
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Button
          onClick={() => actions.listening.set(true)}
          variant="contained"
          color="primary"
        >
          Ativar assistente
        </Button>
      </Grid>
    );
  }

  return (
    // <Assistant lang="pt-BR">
    <Header>
      <Grid container>
        <Grid item xs>
          <Patients />
        </Grid>
        <Divider
          orientation="vertical"
          flexItem
          variant="fullWidth"
          style={{ margin: "0 20px" }}
        />
        <Grid item xs={4}>
          <Chat />
        </Grid>
      </Grid>
    </Header>
    // </Assistant>
  );
}

export default App;
