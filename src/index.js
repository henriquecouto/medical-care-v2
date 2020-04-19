import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import App from "./App";
import { GlobalContextProvider } from "./Context/global";
import Admin from "./Admin";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#009688" },
    secondary: { main: "#607d8b" },
    text: { third: "#fff" },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <GlobalContextProvider>
        <Route exact path="/">
          <Redirect to="/app" />
        </Route>
        <Route exact path="/admin">
          <Admin />
        </Route>
        <Route path="/app">
          <App />
        </Route>
      </GlobalContextProvider>
    </Router>
  </ThemeProvider>,
  document.getElementById("root")
);
