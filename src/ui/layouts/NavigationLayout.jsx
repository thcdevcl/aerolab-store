import React from "react";
import Swing from "react-reveal/Swing";

import logo from "../../assets/aerolab-logo.svg";
import coin from "../../assets/coin.svg";

import { AppContextConsumer } from "../../App";

import { Hidden, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Spinner from "../components/utils/Spinner";

const useStyles = makeStyles(theme => ({
  coin: {
    "&:hover": {
      cursor: "pointer"
    }
  },
  name: {
    fontSize: theme.spacing(3),
    marginRight: theme.spacing(2),
    color: "#616161"
  },
  nav: {
    position: "fixed",
    height: theme.spacing(10),
    width: "100%",
    backgroundColor: theme.palette.common.white,
    zIndex: 1000,
    boxShadow: theme.shadows[5]
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
      {({ state, addPoints }) => {
        const { me } = state;
        return (
          <nav className={classes.nav}>
            <Grid
              container
              classes={{ container: classes.navContainer }}
              justify="space-between"
              alignItems="center"
            >
              <Swing>
                <img src={logo} alt="aerolab-logo" />
              </Swing>
              {me && (
                <div style={{ display: "inline-flex", alignItems: "center" }}>
                  <Hidden xsDown>
                    <Typography
                      variant="body1"
                      classes={{ body1: classes.name }}
                    >
                      {me.name}
                    </Typography>
                  </Hidden>
                  <div className={classes.pointsContainer}>
                    {state.loading ? (
                      <Spinner size={15} />
                    ) : (
                      <Typography
                        variant="body1"
                        classes={{ body1: classes.points }}
                      >
                        {me.points}
                        <img
                          src={coin}
                          alt="coin"
                          onClick={() => addPoints()}
                          className={classes.coin}
                        />
                      </Typography>
                    )}
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
