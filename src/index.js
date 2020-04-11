import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import App from "./App";
import { GlobalContextProvider } from "./Context/global";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#009688" },
    secondary: { main: "#607d8b" },
    text: { third: "#fff" },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
