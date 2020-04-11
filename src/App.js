import React, { useState, useContext } from "react";
import Assistant from "./Assistant";
import { Button, Grid, Divider } from "@material-ui/core";
import Header from "./components/Header";
import Chat from "./components/Chat";
import { GlobalContext } from "./Context/global";
import Login from "./components/Login";

function App() {
  const [{ user }] = useContext(GlobalContext);

  if (!user.status) {
    return <Login />;
  }

  return (
    <Assistant lang="pt-BR">
      <Header>
        <Grid container>
          <Grid item xs>
            {/* <Chat /> */}
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
    </Assistant>
  );
}

export default App;
