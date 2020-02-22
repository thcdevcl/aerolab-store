import React from "react";
import electronicsBackground from "../../assets/header.png";

import Helmet from "../components/utils/Helmet";

import Header from "../layouts/HeaderLayout";
import Products from "../components/grids/ProductGrid";

export default () => (
  <>
    <Helmet title="Home" />
    <Header headline="Electronics" background={electronicsBackground} />
    <Products />
  </>
);
