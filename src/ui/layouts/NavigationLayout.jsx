import React from "react";
import logo from "../../assets/aerolab-logo.svg";
import coin from "../../assets/coin.svg";

import { AppContextConsumer } from "../../App";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  name: {
    fontSize: theme.spacing(3),
    marginRight: theme.spacing(2),
    color: "#616161"
  },
  nav: {
    position: "fixed",
    height: theme.spacing(10),
    width: "100%"
  },
  navContainer: {
    padding: `0px ${theme.spacing(6)}px`,
    height: "100%"
  },
  points: {
    fontSize: theme.spacing(3),
    display: "flex",
    padding: `2px 8px`,
    color: "#616161"
  },
  pointsContainer: {
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: theme.palette.grey[200],
    borderRadius: 100,
    padding: 5
  }
}));

export default () => {
  const classes = useStyles();
  return (
    <AppContextConsumer>
      {({ me }) => {
        return (
          <nav className={classes.nav}>
            <Grid
              container
              classes={{ container: classes.navContainer }}
              justify="space-between"
              alignItems="center"
            >
              <img src={logo} alt="aerolab-logo" />
              {me && (
                <div style={{ display: "inline-flex", alignItems: "center" }}>
                  <Typography variant="body1" classes={{ body1: classes.name }}>
                    {me.name}
                  </Typography>
                  <div className={classes.pointsContainer}>
                    <Typography
                      variant="body1"
                      classes={{ body1: classes.points }}
                    >
                      {me.points}
                      <img src={coin} alt="coin" />
                    </Typography>
                  </div>
                </div>
              )}
            </Grid>
          </nav>
        );
      }}
    </AppContextConsumer>
  );
};
