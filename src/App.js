import React, { createContext } from "react";

import { HelmetProvider } from "react-helmet-async";

import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./assets/theme";

import Router from "./ui/components/router";

const AppContext = createContext();

export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;

export default () => (
  <HelmetProvider>
    <MuiThemeProvider theme={theme}>
      <Router />
    </MuiThemeProvider>
  </HelmetProvider>
);
