import React, { useState } from "react";
import useEmailValidation from "../hooks/useEmailValidation";
import { Link } from "react-router-dom";
import useLoanState from "../hooks/useLoanState";

const STATUS = {
  IDLE: "IDLE",
  SUBMITTING: "SUBMITTING",
  TO_BE_FIXED: "TO_BE_FIXED",
  COMPLETED: "COMPLETED",
  REJECTED: "REJECTED",
};

const rejections = {
  loan: {
    100: "We cannot accept the loan. Amount exceeds limit.",
    101: "We cannot accept the loan. First loan is maximum 50$.",
  },
  payment: {
    100: "We cannot accept the payment. Amount exceeds debt.",
    101: "We cannot accept the payment. No debt.",
  },
};

const titles = {
  loan: "Request a Loan",
  payment: "Make a Payment",
  info: "Check Debt",
};

const actions = {
  loan: "Request",
  payment: "Make Payment",
  info: "Check",
};

export default function Loans({ type = "info" }) {
  const { email, setEmail, emailValid } = useEmailValidation();
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState(STATUS.IDLE);
  const [touched, setTouched] = useState({});
  const { loans, performAction } = useLoanState();
  const [errorCode, setErrorCode] = useState(null);

  const validationErrors = getErrors();
  const formIsValid = Object.keys(validationErrors).length === 0;

  const handleChange = (e) => {
    if (e.target.id === "email") setEmail(e.target.value);
    if (e.target.id === "amount") setAmount(e.target.value);
    setErrorCode(null);
    setStatus(STATUS.IDLE);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if (formIsValid) {
      const result = await performAction(type, email, amount);
      if (result.error) {
        setErrorCode(result.error);
        setStatus(STATUS.REJECTED);
      } else {
        setErrorCode(null);
        setStatus(STATUS.COMPLETED);
      }
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

  const successMessage = {
    loan: `We can accept the loan. Total debt: $${loans[email]}`,
    payment: `Payment accepted. Current debt: $${loans[email]}`,
    info: loans[email]
      ? `Current debt: $${loans[email]}`
      : `You have no loans.`,
  };

  if (status === STATUS.COMPLETED)
    return (
      <>
        <h3>{`Client: ${email}`}</h3>
        <h4>{successMessage[type]}</h4>
        <Link to="/" className="btn btn-primary">
          Back To Home
        </Link>
      </>
    );

  return (
    <div className="container">
      <h2>{titles[type]}</h2>
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
            {touched.email &&
              status === STATUS.TO_BE_FIXED &&
              validationErrors.email}
          </span>
        </div>
        {type !== "info" && (
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
              {touched.amount &&
                status === STATUS.TO_BE_FIXED &&
                validationErrors.amount}
            </span>
          </div>
        )}
        <div>
          <input
            type="submit"
            className="btn btn-primary mt-2"
            disabled={
              status === STATUS.SUBMITTING || (type !== "info" && !amount)
            }
            value={actions[type]}
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
      {status === STATUS.REJECTED && <p>{rejections[type][errorCode]}</p>}
    </div>
  );
}
