export default function loanReducer(loans = {}, action) {
  switch (action.type) {
    case "loan":
      if (!loans[action.email]) {
        return { ...loans, [action.email]: action.amount };
      } else {
        return {
          ...loans,
          [action.email]: loans[action.email] + action.amount,
        };
      }
    case "payment":
      if (loans[action.email])
        return {
          ...loans,
          [action.email]: loans[action.email] - action.amount,
        };
      return loans;
    default:
      return loans;
  }
}
