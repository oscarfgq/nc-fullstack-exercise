import React from "react";
import { Switch, Route } from "react-router";
import Navigation from "./common/Navigation";
import MainPage from "./MainPage";
import PageNotFound from "./PageNotFound";
import LoansPage from "./LoansPage";

export default function App() {
  return (
    <div className="container-fluid">
      <Navigation />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/loans" component={LoansPage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}
