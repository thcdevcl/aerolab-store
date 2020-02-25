import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer
} from "react";
import ReactNotification from "react-notifications-component";

import { HelmetProvider } from "react-helmet-async";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./assets/theme";

import "react-notifications-component/dist/theme.css";
import "./styles.css";

import Router from "./ui/components/router";

const initialState = { me: {}, loading: true };

const reducer = (state, action) => {
  switch (action.type) {
    case "updateUser": {
      return { ...state, me: action.me, loading: false };
    }
    case "toggleLoading": {
      return { ...state, loading: !state.loading };
    }
    default:
      return null;
  }
};

const AppContext = createContext(initialState);

const fetchUser = async () =>
  await fetch(`${process.env.REACT_APP_AEROLAB_API_BASE}/user/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_AEROLAB_API_KEY}`
    }
  })
    .then(result => result.json())
    .catch(error => error);

export function AppContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateUser = useCallback(async () => {
    const user = await fetchUser();
    dispatch({ type: "updateUser", me: user });
  }, []);

  useEffect(() => {
    updateUser();
  }, [updateUser]);

  return (
    <AppContext.Provider value={{ state, updateUser }}>
      {props.children}
    </AppContext.Provider>
  );
}

export const AppContextConsumer = AppContext.Consumer;

export default () => (
  <>
    <ReactNotification isMobile={false} />
    <HelmetProvider>
      <MuiThemeProvider theme={theme}>
        <AppContextProvider>
          <Router />
        </AppContextProvider>
      </MuiThemeProvider>
    </HelmetProvider>
  </>
);
