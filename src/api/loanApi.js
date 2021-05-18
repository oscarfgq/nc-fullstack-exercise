import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL;

export async function checkAmount(email, amount) {
  return fetch(baseUrl + "/loan", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, amount }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export async function getAll() {
  return fetch(baseUrl + "/loan")
    .then(handleResponse)
    .catch(handleError);
}

export async function payAmount(email, amount) {
  return fetch(baseUrl + "/payments", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, amount }),
  })
    .then(handleResponse)
    .catch(handleError);
}
