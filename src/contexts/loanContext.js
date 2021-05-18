import React, { createContext, useState, useReducer } from "react";
import { checkAmount, payAmount, getAll } from "../api/loanApi";
import loanReducer from "../reducers/loanReducer";

export const LoanContext = createContext();

export default function LoanProvider({ children }) {
  const [loans, dispatch] = useReducer(loanReducer, {});
  const [error, setError] = useState(null);

  async function makeLoan(email, amount) {
    try {
      const result = await checkAmount(email, amount);
      if (result.error) {
        return result;
      } else {
        dispatch({ type: "makeLoan", email, amount: parseInt(amount) });
        return { email: result };
      }
    } catch (e) {
      setError(e);
    }
  }

  async function fetchLoans() {
    try {
      const allLoans = await getAll();
      console.log(allLoans);
      dispatch({ type: "loadLoans", allLoans });
    } catch (e) {
      setError(e);
    }
  }

  async function makePayment(email, amount) {
    try {
      const result = await payAmount(email, amount);
      console.log("This is the response from API: " + result);
      console.log(result);
      if (result.error) {
        return result;
      } else {
        dispatch({ type: "makePayment", email, amount: parseInt(amount) });
        return { email: result };
      }
    } catch (e) {
      setError(e);
    }
  }

  const provider = {
    loans,
    error,
    makeLoan,
    fetchLoans,
    makePayment,
  };

  return (
    <LoanContext.Provider value={provider}>{children}</LoanContext.Provider>
  );
}
