import React from "react";
import PropTypes from "prop-types";

import coin from "../../../assets/coin.svg";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  label: {
    position: "absolute",
    top: 12,
    right: 12,
    display: "flex",
    alignItems: "center",
    borderRadius: 100,
    background: "rgba(97,97,97, 0.8)",
    padding: `4px 6px`,
    color: theme.palette.common.white
  },
  coin: { height: 20, width: 20, marginLeft: 4 }
}));

function Chip({ diff }) {
  const classes = useStyles();
  return (
    <Typography variant="body2" classes={{ body2: classes.label }}>
      You need {diff}
      <img src={coin} alt="coin" className={classes.coin} />
    </Typography>
  );
}

Chip.propTypes = {
  diff: PropTypes.number.isRequired
};

export default Chip;
