import React, { useState, useContext } from "react";
import Assistant from "./Assistant";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalContext } from "./Context/global";

const useStyles = makeStyles((theme) => ({}));

function App() {
  const [speechActive, setSpeechActive] = useState(false);
  const classes = useStyles();
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
      <div>{messages.map((v) => JSON.stringify(v))}</div>
    </Assistant>
  );
}

export default App;
