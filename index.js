import express, { Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/mongodbConnection.js";
import UserRouter from "./routes/userRoute.js";
import SuscriberRouter from "./routes/suscriberRoute.js";
import ProductRouter from "./routes/productRoute.js"

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server started at port " + PORT);
});

connectDB();

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/suscribers", SuscriberRouter);
app.use("/api/v1/products",ProductRouter)