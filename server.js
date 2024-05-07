const express = require("express");
const mongoose = require("mongoose");
const asutaRouter = require("./routers/asutaRouter");
require("dotenv").config();

mongoose.connect(process.env.MongoConnString);

const db = mongoose.connection;

db.on("error", (err) => console.log(err));

db.on("open", () => console.log("connection opened"));

const app = express();

app.use(express.json());

app.use("/asutaApi", asutaRouter);

app.listen(3000, () => console.log("listening on port 3000"));
