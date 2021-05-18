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
  let email = req.body.email;
  let amount = req.body.amount;
  try {
    const dbResponse = await dbServices.setByEmail(email, parseInt(amount));
    res.status(200).json(dbResponse);
  } catch ({ code }) {
    res.status(200).json({ error: code });
  }
});

app.get("/loan", async (req, res) => {
  try {
    const dbResponse = await dbServices.getAll();
    res.status(200).json(dbResponse);
  } catch (e) {
    console.error(e);
  }
});

app.post("/payments", async (req, res) => {
  let email = req.body.email;
  let amount = req.body.amount;
  try {
    const dbResponse = await dbServices.payByEmail(email, parseInt(amount));
    res.status(200).json(dbResponse);
  } catch ({ code }) {
    res.status(200).json({ error: code });
  }
});

app.post("/information", async (req, res) => {
  let email = req.body.email;
  try {
    const dbResponse = await dbServices.findByEmail(email);
    res.status(200).json(dbResponse);
  } catch (e) {
    console.error(e);
  }
});

app.get("/loan", async (req, res) => {
  try {
    const dbResponse = await dbServices.getAll();
    res.status(200).json(dbResponse);
  } catch (e) {
    console.error(e);
  }
});
