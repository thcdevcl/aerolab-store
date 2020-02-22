import React, { useState } from "react";
import classNames from "classnames";

import buyBlue from "../../../assets/buy-blue.svg";
import buyWhite from "../../../assets/buy-white.svg";
import coin from "../../../assets/coin.svg";

import { Card, Button, Divider, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import WarningChip from "../chips/WarningChip";

const useStyles = makeStyles(theme => ({
  buyIcon: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 2
  },
  cardContainer: { position: "relative", padding: `0px ${theme.spacing(2)}px` },
  category: {
    fontSize: 16,
    color: "#a3a3a3"
  },
  coin: { height: 36, width: 36 },
  cost: {
    fontSize: 36,
    color: theme.palette.common.white,
    display: "flex",
    alignItems: "center"
  },
  hover: {
    top: -8
  },
  image: { maxWidth: "100%" },
  name: {
    fontSize: 18,
    color: theme.palette.grey[800],
    fontWeight: 600,
    color: "#616161"
  },
  redeemButton: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 100,
    boxShadow: "none",
    "&:hover": {
      color: theme.palette.common.white
    }
  }
}));

export default ({ _id, name, cost, category, img, points }) => {
  const classes = useStyles();
  const [state, setState] = useState({ hover: false });
  const { hover } = state;
  const toggleHover = () => setState({ hover: !hover });
  const redeemable = points - cost > 0;
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} style={{ marginBottom: 15 }}>
      <Grid
        container
        component={Card}
        elevation={hover ? 8 : 2}
        classes={{
          container: classNames(classes.cardContainer, hover && classes.hover)
        }}
        justify="center"
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
      >
        {redeemable ? (
          hover ? (
            <img src={buyWhite} className={classes.buyIcon} />
          ) : (
            <img src={buyBlue} className={classes.buyIcon} />
          )
        ) : (
          !hover && <WarningChip diff={cost - points} />
        )}
        <img src={img.url} alt={name} className={classes.image} />
        <Grid item xs={12}>
          <Divider style={{ marginBottom: 16 }} />
          <Typography variant="caption" classes={{ caption: classes.category }}>
            {category}
          </Typography>
          <Typography
            variant="body1"
            classes={{ body1: classes.name }}
            gutterBottom
          >
            {name}
          </Typography>
        </Grid>
        {hover && (
          <div
            style={{
              background: "rgba(37,187,241, 0.8)",
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 1
            }}
          >
            <Grid
              container
              direction="column"
              alignContent="center"
              alignItems="center"
              justify="center"
              style={{ flex: 1, height: "100%" }}
            >
              {!redeemable && (
                <Typography
                  variant="h5"
                  align="center"
                  classes={{ h5: classes.neededLabel }}
                  gutterBottom
                >
                  You need
                </Typography>
              )}
              <Typography
                variant="h3"
                align="center"
                classes={{ h3: classes.cost }}
                gutterBottom
              >
                {redeemable
                  ? cost.toLocaleString()
                  : new Number(cost - points).toLocaleString()}
                <img src={coin} alt="coin" className={classes.coin} />
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                classes={{ contained: classes.redeemButton }}
              >
                {redeemable ? "Redeem now" : "Top up"}
              </Button>
            </Grid>
          </div>
        )}
      </Grid>
    </Grid>
  );
};
