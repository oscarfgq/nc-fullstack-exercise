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
