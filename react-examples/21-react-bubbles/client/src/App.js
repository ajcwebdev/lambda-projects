// React
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Components
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
// Styling
import "./styles.scss";


function App() {
  return (
    <Router>
      <div className="App">
        <PrivateRoute exact path='/protected' component={BubblePage} />
        <Route exact path="/" component={Login} />
        <Route path='/login' component={Login} />
      </div>
    </Router>
  );
}

export default App;