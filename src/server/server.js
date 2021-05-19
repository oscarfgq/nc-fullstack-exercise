import express from "express";
import cors from "cors";
import services from "./services";

let port = 1705;
let app = express();

app.listen(port, console.log(`Server listening on port ${port}`));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const dbServices = services();

app.post("/loan", async (req, res) => {
  const email = req.body.email;
  const amount = req.body.amount;
  let response = { status: 200, statusText: "OK" };
  try {
    const dbResponse = await dbServices.setByEmail(email, parseInt(amount));
    if (dbResponse.error) {
      response = {
        ...response,
        ...dbResponse,
      };
    }
    res.status(200).json(response);
  } catch (e) {
    throw e;
  }
});

app.post("/payments", async (req, res) => {
  const email = req.body.email;
  const amount = req.body.amount;
  let response = { status: 200, statusText: "OK" };
  try {
    const dbResponse = await dbServices.payByEmail(email, parseInt(amount));
    if (dbResponse.error) {
      response = {
        ...response,
        ...dbResponse,
      };
    }
    res.status(200).json(response);
  } catch (e) {
    throw e;
  }
});

app.post("/information", async (req, res) => {
  const email = req.body.email;
  let response = { status: 200, statusText: "OK" };
  try {
    const dbResponse = await dbServices.findByEmail(email);
    if (dbResponse) {
      response = {
        ...response,
        data: { amount: dbResponse },
      };
    }
    res.status(200).json(response);
  } catch (e) {
    throw e;
  }
});
