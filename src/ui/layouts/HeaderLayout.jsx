import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default ({ headline, background }) => {
  const useStyles = makeStyles(theme => ({
    rootContainer: {
      backgroundImage: `url(${background})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      height: "33vh",
      [theme.breakpoints.up("md")]: {
        paddingLeft: theme.spacing(16),
        paddingBottom: theme.spacing(6)
      },
      [theme.breakpoints.down("sm")]: {
        paddingLeft: theme.spacing(6),
        paddingBottom: theme.spacing(4),
        backgroundPosition: "right"
      }
    },
    headline: {
      color: theme.palette.common.white,
      fontWeight: 800
    }
  }));
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column-reverse"
      classes={{ container: classes.rootContainer }}
    >
      <Typography variant="h3" classes={{ h3: classes.headline }}>
        {headline}
      </Typography>
    </Grid>
  );
};
