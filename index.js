import express, { Router } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/mongodbConnection.js";
import router from "./routes/userRoute.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server started at port "+ PORT);
})

connectDB();


app.use("/api/v1/users", router);