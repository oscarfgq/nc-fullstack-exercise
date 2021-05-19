import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL;

export function makeLoan(email, amount) {
  return fetch(baseUrl + "/loan", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, amount }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function payLoan(email, amount) {
  return fetch(baseUrl + "/payments", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, amount }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function checkStatus(email) {
  return fetch(baseUrl + "/information", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email }),
  })
    .then(handleResponse)
    .catch(handleError);
}
