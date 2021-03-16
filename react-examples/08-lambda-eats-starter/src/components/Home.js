import React from "react";
import { Link } from "react-router-dom";

const Home = props => {
  return (
    <Link to="/pizza">
      <h1>Pizza</h1>
    </Link>
  );
};

export default Home;
