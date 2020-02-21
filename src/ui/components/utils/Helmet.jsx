import React from "react";
import { Helmet } from "react-helmet-async";

export default ({ title, name, content }) => (
  <Helmet>
    <title>{`${process.env.REACT_APP_NAME} | ${title}`}</title>
    <meta name={name} content={content} />
  </Helmet>
);
