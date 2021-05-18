import React, { createContext, useState, useReducer } from "react";
import { checkAmount, getAll } from "../api/loanApi";
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

  const provider = {
    loans,
    error,
    makeLoan,
    fetchLoans,
  };

  return (
    <LoanContext.Provider value={provider}>{children}</LoanContext.Provider>
  );
}
