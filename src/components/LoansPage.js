import React, { useState, useEffect } from "react";
import useEmailValidation from "../hooks/useEmailValidation";
import { Link } from "react-router-dom";
import useLoanState from "../hooks/useLoanState";

export const STATUS = {
  IDLE: "IDLE",
  SUBMITTING: "SUBMITTING",
  TO_BE_FIXED: "TO_BE_FIXED",
  COMPLETED: "COMPLETED",
  REJECTED: "REJECTED",
};

export default function LoansPage() {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState(STATUS.IDLE);
  const { email, setEmail, emailValid } = useEmailValidation();
  const [touched, setTouched] = useState({});
  const { loans, error, makeLoan, fetchLoans } = useLoanState();

  const title = `Request a Loan`;
  const actionButton = `Request Loan`;
  const completedMessage = `We can accept the loan`;
  const rejectedMessage_100 = `We cannot accept the loan.`;
  const rejectedMessage_101 = `We cannot accept the loan. First loan is maximum 50$.`;

  const validationErrors = getErrors();
  const formIsValid = Object.keys(validationErrors).length === 0;

  useEffect(() => {
    if (Object.keys(loans).length === 0) fetchLoans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    if (e.target.id === "email") setEmail(e.target.value);
    if (e.target.id === "amount") {
      setAmount(e.target.value);
      setStatus(STATUS.IDLE);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if (formIsValid) {
      const result = await makeLoan(email, amount);
      if (result.error) setStatus(STATUS.REJECTED);
      else setStatus(STATUS.COMPLETED);
    } else setStatus(STATUS.TO_BE_FIXED);
  };

  const handleBlur = (e) => {
    setTouched((currentTouched) => {
      return { ...currentTouched, [e.target.id]: true };
    });
  };

  function getErrors() {
    const errors = {};
    if (!emailValid) errors.email = "Valid email is required";
    if (isNaN(amount)) errors.amount = "Amount must be a number";
    return errors;
  }

  if (error) throw error;
  if (status === STATUS.COMPLETED)
    return (
      <>
        <h4>{completedMessage}</h4>
        <Link to="/" className="btn btn-primary">
          Back To Home
        </Link>
      </>
    );

  return (
    <div className="container">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="me-1" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onBlur={handleBlur}
            onChange={handleChange}
            className="me-2 mt-2"
          />
          <span role="alert">
            {touched.email && STATUS.TO_BE_FIXED && validationErrors.email}
          </span>
        </div>
        <div>
          <label className="me-1" htmlFor="amount">
            Amount:
          </label>
          <input
            id="amount"
            type="text"
            value={amount}
            onBlur={handleBlur}
            onChange={handleChange}
            className="me-2 mt-2"
            disabled={!email}
          />
          <span role="alert">
            {touched.amount && STATUS.TO_BE_FIXED && validationErrors.amount}
          </span>
        </div>
        <div>
          <input
            type="submit"
            className="btn btn-primary mt-2"
            disabled={status === STATUS.SUBMITTING}
            value={actionButton}
          />
        </div>
      </form>
      {!formIsValid && status === STATUS.TO_BE_FIXED && (
        <div role="alert">
          <ul>
            {Object.keys(validationErrors).map((errorKey) => (
              <li key={errorKey}>{validationErrors[errorKey]}</li>
            ))}
          </ul>
        </div>
      )}
      {status === STATUS.REJECTED &&
        (!loans[email] ? (
          <p>{rejectedMessage_101}</p>
        ) : (
          <p>{rejectedMessage_100}</p>
        ))}
      <h4 className="mt-4">Current debt: {loans[email] || 0}</h4>
    </div>
  );
}
