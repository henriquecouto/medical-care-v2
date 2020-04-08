import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  background: "linear-gradient(45deg, #c5cae9 30%, #fff 90%)",
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
