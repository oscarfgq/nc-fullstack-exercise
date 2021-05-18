import React from "react";
import { Switch, Route } from "react-router";
import Navigation from "./common/Navigation";
import MainPage from "./MainPage";
import PageNotFound from "./PageNotFound";
import LoansPage from "./LoansPage";
import LoanProvider from "../contexts/loanContext";
import PaymentsPage from "./PaymentsPage";
import InfoPage from "./InfoPage";

export default function App() {
  return (
    <div className="container-fluid">
      <LoanProvider>
        <Navigation />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/loans" component={LoansPage} />
          <Route path="/payments" component={PaymentsPage} />
          <Route path="/info" component={InfoPage} />
          <Route component={PageNotFound} />
        </Switch>
      </LoanProvider>
    </div>
  );
}
