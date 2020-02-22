import React, { createContext, useEffect, useState } from "react";
import "./styles.css";
import { HelmetProvider } from "react-helmet-async";

import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./assets/theme";

import Spinner from "./ui/components/utils/Spinner";

import Router from "./ui/components/router";

const AppContext = createContext();

export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;

export default () => {
  const [state, setState] = useState({ me: {}, loading: true });
  useEffect(() => {
    const fetchUser = async () => {
      await fetch(`${process.env.REACT_APP_AEROLAB_API_BASE}/user/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AEROLAB_API_KEY}`
        }
      }).then(result =>
        result.json().then(me => setState({ me, loading: false }))
      );
    };
    fetchUser();
  }, []);
  const { me, loading } = state;
  if (loading) return <Spinner />;
  return (
    <HelmetProvider>
      <MuiThemeProvider theme={theme}>
        <AppContextProvider value={{ me }}>
          <Router />
        </AppContextProvider>
      </MuiThemeProvider>
    </HelmetProvider>
  );
};
