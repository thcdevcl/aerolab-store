import React, { useEffect, useState } from "react";
import classNames from "classnames";

import { Button, Divider, Grid, Typography } from "@material-ui/core";
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
  },
  paginationActionContainer: {
    width: "100%",
    flex: 1,
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center"
    }
  },
  activeSort: {
    backgroundColor: `${theme.palette.secondary.main} !important`,
    color: `${theme.palette.common.white} !important`
  },
  nextPageButton: {
    borderRadius: 100,
    margin: "0px 2px"
  },
  sortButton: {
    margin: "0px 4px",
    borderRadius: 100,
    backgroundColor: "#ededed",
    border: "none",
    color: "#a3a3a3"
  },
  sortBy: {
    color: "#a3a3a3",
    fontSize: 24,
    marginRight: 8,
    paddingLeft: 8,
    borderLeft: "1px solid #d9d9d9"
  },
  viewingProducts: {
    color: "#616161",
    fontSize: 24,
    marginRight: 8
  }
}));

function ProductGrid({ products }) {
  const classes = useStyles();
  const [state, setState] = useState({
    active: 0,
    sortByPrice: ""
  });
  const { active, sortByPrice } = state;
  const productsPerPage = 16;
  const productsByPage = Array.from(
    { length: Math.ceil(products.length / productsPerPage) },
    (v, i) => {
      if (sortByPrice) {
        return products
          .sort(function(a, b) {
            return sortByPrice === "asc" ? a.cost - b.cost : b.cost - a.cost;
          })
          .slice(i * productsPerPage, i * productsPerPage + productsPerPage);
      } else {
        return products.slice(
          i * productsPerPage,
          i * productsPerPage + productsPerPage
        );
      }
    }
  );
  const setSort = order =>
    setState(prevState => ({ ...prevState, sortByPrice: order }));
  return (
    <AppContextConsumer>
      {({ me }) => {
        return (
          <Grid
            container
            spacing={2}
            classes={{ container: classes.rootContainer }}
          >
            <Grid container style={{ padding: "0px 8px" }} alignItems="center">
              <Typography
                variant="body1"
                classes={{ body1: classes.viewingProducts }}
              >
                {`${
                  active + 1 === productsByPage.length
                    ? products.length
                    : (active + 1) * productsPerPage
                } of `}
                {`${products.length} product${products.length > 1 && "s"}`}
              </Typography>
              <Typography variant="body1" classes={{ body1: classes.sortBy }}>
                Sort by:
              </Typography>
              <Button
                variant="outlined"
                color="default"
                classes={{
                  outlined: classNames(
                    classes.sortButton,
                    sortByPrice === "asc" && classes.activeSort
                  )
                }}
                onClick={event => setSort("asc")}
              >
                Lowest Price
              </Button>
              <Button
                variant="outlined"
                color="default"
                classes={{
                  outlined: classNames(
                    classes.sortButton,
                    sortByPrice === "desc" && classes.activeSort
                  )
                }}
                onClick={event => setSort("desc")}
              >
                Highest Price
              </Button>
              <Grid
                container
                justify="flex-end"
                classes={{ container: classes.paginationActionContainer }}
              >
                {active > 0 && (
                  <Button
                    variant="outlined"
                    color="default"
                    classes={{ outlined: classes.nextPageButton }}
                    onClick={() =>
                      setState(prevState => ({
                        ...prevState,
                        active: active - 1
                      }))
                    }
                  >
                    <i className="fas fa-chevron-left"></i>
                  </Button>
                )}
                <Button
                  variant="outlined"
                  color="default"
                  classes={{ outlined: classes.nextPageButton }}
                  onClick={() =>
                    setState(prevState => ({
                      ...prevState,
                      active: active + 1
                    }))
                  }
                  disabled={active + 1 === productsByPage.length}
                >
                  <i className="fas fa-chevron-right"></i>
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider style={{ marginTop: 8, marginBottom: 24 }} />
            </Grid>
            {productsByPage[active].map(product => (
              <Product key={product._id} {...product} points={me.points} />
            ))}
            <Grid container style={{ padding: "0px 8px" }} alignItems="center">
              <Typography
                variant="body1"
                classes={{ body1: classes.viewingProducts }}
              >
                {`${
                  active + 1 === productsByPage.length
                    ? products.length
                    : (active + 1) * productsPerPage
                } of `}
                {`${products.length} product${products.length > 1 && "s"}`}
              </Typography>
              <Grid
                container
                justify="flex-end"
                style={{ width: "100%", flex: 1 }}
              >
                {active > 0 && (
                  <Button
                    variant="outlined"
                    color="default"
                    classes={{ outlined: classes.nextPageButton }}
                    onClick={() =>
                      setState(prevState => ({
                        ...prevState,
                        active: active - 1
                      }))
                    }
                  >
                    <i className="fas fa-chevron-left"></i>
                  </Button>
                )}
                <Button
                  variant="outlined"
                  color="default"
                  classes={{ outlined: classes.nextPageButton }}
                  onClick={() =>
                    setState(prevState => ({
                      ...prevState,
                      active: active + 1
                    }))
                  }
                  disabled={active + 1 === productsByPage.length}
                >
                  <i className="fas fa-chevron-right"></i>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Divider style={{ marginTop: 8, marginBottom: 24 }} />
              </Grid>
            </Grid>
          </Grid>
        );
      }}
    </AppContextConsumer>
  );
}

export default () => {
  const [state, setState] = useState({
    products: {},
    loading: true
  });
  const { products, loading } = state;
  useEffect(() => {
    const fetchUser = async () => {
      await fetch(`${process.env.REACT_APP_AEROLAB_API_BASE}/products`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AEROLAB_API_KEY}`
        }
      }).then(result =>
        result
          .json()
          .then(products =>
            setState(prevState => ({ ...prevState, products, loading: false }))
          )
      );
    };
    fetchUser();
  }, []);
  if (loading) return <Spinner />;
  return <ProductGrid products={products} />;
};
