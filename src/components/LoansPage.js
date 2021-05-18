import React, { useState } from "react";

export default function LoansPage() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  const handleChange = (e) => {
    if (e.target.id === "email") setEmail(e.target.value);
    if (e.target.id === "amount") {
      setAmount(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <h2>Request a Loan</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="me-1" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={handleChange}
            className="me-2 mt-2"
          />
        </div>
        <div>
          <label className="me-1" htmlFor="amount">
            Amount:
          </label>
          <input
            id="amount"
            type="text"
            value={amount}
            onChange={handleChange}
            className="me-2 mt-2"
            disabled={!email}
          />
        </div>
        <div>
          <input
            type="submit"
            className="btn btn-primary mt-2"
            value={"Request Loan"}
          />
        </div>
      </form>
    </div>
  );
}
