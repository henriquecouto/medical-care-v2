import React, { useState } from "react";
import Assistant from "./Assistant";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  activeAssistant: {
    background: theme.background,
  },
}));

function App() {
  const [speechActive, setSpeechActive] = useState(false);
  const classes = useStyles();

  if (!speechActive) {
    return (
      <div
        className={classes.activeAssistant}
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button onClick={() => setSpeechActive(true)}>Ativar assistente</Button>
      </div>
    );
  }

  return <Assistant lang="pt-BR" active={speechActive}></Assistant>;
}

export default App;
