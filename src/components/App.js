import React from "react";
import { Switch, Route } from "react-router";
import Navigation from "./common/Navigation";

export default function App() {
  return (
    <div className="container-fluid">
      <Navigation />
      <Switch>
        <Route exact path="/" render={() => <h1>Home</h1>} />
      </Switch>
    </div>
  );
}
