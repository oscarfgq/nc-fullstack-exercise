export default function loanReducer(loans = {}, action) {
  switch (action.type) {
    case "makeLoan":
      if (!loans[action.email]) {
        return { ...loans, [action.email]: action.amount };
      } else {
        return {
          ...loans,
          [action.email]: loans[action.email] + action.amount,
        };
      }
    case "loadLoans":
      return action.allLoans;
    default:
      throw new Error("Unhandled action" + action.type);
  }
}
