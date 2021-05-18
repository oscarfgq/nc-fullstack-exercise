import React, { useState } from "react";
import useEmailValidation from "../hooks/useEmailValidation";
import { Link } from "react-router-dom";

export const STATUS = {
  IDLE: "IDLE",
  SUBMITTING: "SUBMITTING",
  TO_BE_FIXED: "TO_BE_FIXED",
  COMPLETED: "COMPLETED",
};

export default function LoansPage() {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState(STATUS.IDLE);
  const { email, setEmail, emailValid } = useEmailValidation();
  const [touched, setTouched] = useState({});

  const title = `Request a Loan`;
  const actionButton = `Request Loan`;
  const completedMessage = `We can accept the loan`;

  const validationErrors = getErrors();
  const formIsValid = Object.keys(validationErrors).length === 0;

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
      // Process loan
      // setStatus(STATUS.COMPLETED);
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
    </div>
  );
}
