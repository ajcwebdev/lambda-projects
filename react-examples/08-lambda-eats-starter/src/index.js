import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { BrowserRouter, Route } from "react-router-dom";
import Form from "./components/Form";

ReactDOM.render(
  <BrowserRouter>
    <Route component={App} />
    <Route path="/components/Form" component={Form} />
  </BrowserRouter>,
  document.getElementById("root")
);
