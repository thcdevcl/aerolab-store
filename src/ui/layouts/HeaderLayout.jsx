import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default ({ headline, background }) => {
  const useStyles = makeStyles(theme => ({
    rootContainer: {
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "33vh",
      paddingLeft: theme.spacing(16),
      paddingBottom: theme.spacing(6)
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
