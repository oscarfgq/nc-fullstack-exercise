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
