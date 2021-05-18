import React from "react";
import Loans from "./Loans";
import LoanProvider from "../contexts/loanContext";
import renderer from "react-test-renderer";

it("sets submit button label to 'Request Loan' when type is 'loan'", () => {
  const tree = renderer.create(
    <LoanProvider>
      <Loans type="loan" />
    </LoanProvider>
  );
  expect(tree).toMatchSnapshot();
});

it("sets submit button label to 'Make Payment' when type is 'payment'", () => {
  const tree = renderer.create(
    <LoanProvider>
      <Loans type="payment" />
    </LoanProvider>
  );
  expect(tree).toMatchSnapshot();
});

it("hides submit button when type is 'info'", () => {
  const tree = renderer.create(
    <LoanProvider>
      <Loans type="info" />
    </LoanProvider>
  );
  expect(tree).toMatchSnapshot();
});
