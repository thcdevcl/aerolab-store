import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import ScrollToTop from "../utils/ScrollToTop";

import Navigation from "../../layouts/NavigationLayout";

import Home from "../../pages/HomePage";

const useStyles = makeStyles(theme => ({
  main: { paddingTop: theme.spacing(10) }
}));

export default () => {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path="/">
            <Navigation />
            <main className={classes.main}>
              <Home />
            </main>
          </Route>
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
  );
};
