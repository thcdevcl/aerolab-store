import React from "react";
import electronicsBackground from "../../assets/header.png";

import Helmet from "../components/utils/Helmet";

import Header from "../layouts/HeaderLayout";

export default () => (
  <>
    <Helmet title="Home" />
    <Header headline="Electronics" background={electronicsBackground} />
  </>
);
