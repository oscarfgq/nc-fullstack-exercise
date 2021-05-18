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
