import React from "react";

import { CircularProgress, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    margin: "auto",
    height: "100%"
  }
}));

export default ({ size }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      classes={{ container: classes.container }}
    >
      <CircularProgress
        size={size ? size : 50}
        color="secondary"
        variant="indeterminate"
      />
    </Grid>
  );
};
