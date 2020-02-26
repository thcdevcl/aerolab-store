import React, { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import buyBlue from "../../../assets/buy-blue.svg";
import buyWhite from "../../../assets/buy-white.svg";
import coin from "../../../assets/coin.svg";

import { Card, Button, Divider, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { AppContextConsumer } from "../../../App";

import WarningChip from "../chips/WarningChip";

import Notification from "../utils/Notification";
import Spinner from "../utils/Spinner";

const useStyles = makeStyles(theme => ({
  buyIcon: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 2
  },
  cardContainer: {
    height: "100%",
    position: "relative",
    padding: `0px ${theme.spacing(2)}px`
  },
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

const initialState = { loading: false, hover: false };

const ProductContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case "toggleHover": {
      return { ...state, hover: !state.hover };
    }
    case "toggleLoading": {
      return { ...state, loading: !state.loading };
    }
    default:
      return null;
  }
};

function ProductContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const redeemProduct = async _id => {
    dispatch({ type: "toggleLoading" });
    const productId = { productId: _id };
    await fetch(`${process.env.REACT_APP_AEROLAB_API_BASE}/redeem`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_AEROLAB_API_KEY}`
      },
      body: JSON.stringify(productId)
    })
      .then(result =>
        result.json().then(({ message }) => {
          Notification({ message });
          props.updateUser();
        })
      )
      .catch(error => Notification({ error }));
    dispatch({ type: "toggleLoading" });
  };
  return (
    <ProductContext.Provider value={{ state, dispatch, redeemProduct }}>
      {props.children}
    </ProductContext.Provider>
  );
}

const ProductContextConsumer = ProductContext.Consumer;

function ProductCard({ _id, name, cost, category, img, points }) {
  const classes = useStyles();
  const { state, dispatch } = useContext(ProductContext);
  const { hover, loading } = state;
  const toggleHover = () => dispatch({ type: "toggleHover" });
  const redeemable = points - cost >= 0;
  return (
    <ProductContextConsumer>
      {({ redeemProduct }) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ marginBottom: 15 }}>
            <Grid
              container
              component={Card}
              elevation={hover ? 8 : 2}
              classes={{
                container: classNames(
                  classes.cardContainer,
                  hover && classes.hover
                )
              }}
              justify="center"
              onMouseEnter={toggleHover}
              onMouseLeave={toggleHover}
            >
              {redeemable ? (
                hover ? (
                  <img
                    src={buyWhite}
                    className={classes.buyIcon}
                    alt="buy-icon"
                  />
                ) : (
                  <img
                    src={buyBlue}
                    className={classes.buyIcon}
                    alt="buy-icon"
                  />
                )
              ) : (
                !hover && <WarningChip diff={cost - points} />
              )}
              <img src={img.url} alt={name} className={classes.image} />
              <Grid item xs={12}>
                <Divider style={{ marginBottom: 16 }} />
                <Typography
                  variant="caption"
                  classes={{ caption: classes.category }}
                >
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
                        : (cost - points).toLocaleString()}
                      <img src={coin} alt="coin" className={classes.coin} />
                    </Typography>
                    {redeemable && (
                      <Button
                        variant="contained"
                        color="secondary"
                        classes={{ contained: classes.redeemButton }}
                        onClick={event => {
                          redeemable && redeemProduct(_id);
                        }}
                        disabled={loading}
                      >
                        {loading ? <Spinner /> : "Redeem now"}
                      </Button>
                    )}
                  </Grid>
                </div>
              )}
            </Grid>
          </Grid>
        );
      }}
    </ProductContextConsumer>
  );
}

ProductCard.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  img: PropTypes.object.isRequired,
  points: PropTypes.number
};

export default props => (
  <AppContextConsumer>
    {({ updateUser }) => (
      <ProductContextProvider updateUser={updateUser}>
        <ProductCard {...props} />
      </ProductContextProvider>
    )}
  </AppContextConsumer>
);
