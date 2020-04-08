import React, { useState, useContext } from "react";
import Assistant from "./Assistant";
import { Button, Grid, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalContext } from "./Context/global";
import Header from "./components/Header";
import Chat from "./components/Chat";

const useStyles = makeStyles((theme) => ({}));

function App() {
  const [speechActive, setSpeechActive] = useState(false);
  const [state] = useContext(GlobalContext);
  const { messages } = state;

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
