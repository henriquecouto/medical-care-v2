import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { GlobalContextProvider } from "./Context/global";
import App from "./App";
import Admin from "./Admin";
import Manual from "./Manual";
import ManualApp from "./ManualApp";
import routes from "./constants/routes";

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
          <Redirect to={routes.assistant} />
        </Route>
        <Route exact path={routes.admin}>
          <Admin />
        </Route>
        <Route path={routes.assistant}>
          <App />
        </Route>
        <Route path={routes.manual}>
          <Manual />
        </Route>
        <Route path={routes.manualApp}>
          <ManualApp />
        </Route>
      </GlobalContextProvider>
    </Router>
  </ThemeProvider>,
  document.getElementById("root")
);
