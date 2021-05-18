import { useState, useReducer } from "react";

export default function useEmailValidation() {
  const [emailValid, setEmailValid] = useState(false);
  const [email, setEmail] = useReducer(emailReducer, "");

  function emailReducer(state, action) {
    const isValidEmail = validateEmail(action);
    setEmailValid(isValidEmail);
    return action;
  }

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  return { email, setEmail, emailValid };
}
