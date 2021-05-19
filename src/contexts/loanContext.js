import React, { createContext, useReducer } from "react";
import { makeLoan, payLoan, checkStatus } from "../api/loanApi";
import loanReducer from "../reducers/loanReducer";

export const LoanContext = createContext();

export default function LoanProvider({ children }) {
  const [loans, dispatch] = useReducer(loanReducer, {});

  async function performAction(type, email, amount) {
    try {
      let result;
      switch (type) {
        case "loan":
          result = await makeLoan(email, amount);
          break;
        case "payment":
          result = await payLoan(email, amount);
          break;
        default:
          result = await checkStatus(email);
      }
      if (!result.error)
        dispatch({ type, email, amount: amount ? parseInt(amount) : amount });
      return result;
    } catch (e) {
      throw e;
    }
  }

  const provider = {
    loans,
    performAction,
  };

  return (
    <LoanContext.Provider value={provider}>{children}</LoanContext.Provider>
  );
}
