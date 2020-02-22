import React, { useEffect, useState } from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { AppContextConsumer } from "../../../App";

import Spinner from "../utils/Spinner";

import Product from "../cards/ProductCard";

const useStyles = makeStyles(theme => ({
  rootContainer: {
    width: "100%",
    margin: 0,
    padding: `${theme.spacing(4)}px ${theme.spacing(16)}px`,
    [theme.breakpoints.down("sm")]: {
      padding: `${theme.spacing(4)}px ${theme.spacing(8)}px`
    }
  }
}));

export default () => {
  const classes = useStyles();
  const [state, setState] = useState({ products: {}, loading: true });
  useEffect(() => {
    const fetchUser = async () => {
      await fetch(`${process.env.REACT_APP_AEROLAB_API_BASE}/products`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AEROLAB_API_KEY}`
        }
      }).then(result =>
        result.json().then(products => setState({ products, loading: false }))
      );
    };
    fetchUser();
  }, []);
  const { products, loading } = state;
  if (loading) return <Spinner />;
  return (
    <AppContextConsumer>
      {({ me }) => {
        return (
          <Grid
            container
            spacing={2}
            classes={{ container: classes.rootContainer }}
          >
            {products.map(product => (
              <Product key={product._id} {...product} points={me.points} />
            ))}
          </Grid>
        );
      }}
    </AppContextConsumer>
  );
};
