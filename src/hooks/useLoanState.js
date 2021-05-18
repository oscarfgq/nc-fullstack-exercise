import { useContext } from "react";
import { LoanContext } from "../contexts/loanContext";

export default function useLoanState() {
  const context = useContext(LoanContext);
  if (!context) {
    throw new Error(
      `useLoanState must be used within LoanProvider. Wrap a parent component in <LoanProvider> to fix this error.`
    );
  }
  return context;
}
