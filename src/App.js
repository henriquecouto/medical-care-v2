import React, { useState } from "react";
import Assistant from "./Assistant";
import { Button, Grid, Divider } from "@material-ui/core";
import Header from "./components/Header";
import Chat from "./components/Chat";

function App() {
  const [speechActive, setSpeechActive] = useState(false);

  if (!speechActive) {
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Button
          onClick={() => setSpeechActive(true)}
          variant="contained"
          color="primary"
        >
          Ativar assistente
        </Button>
      </Grid>
    );
  }

  return (
    <Assistant lang="pt-BR" active={speechActive}>
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
