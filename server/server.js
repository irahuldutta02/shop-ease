import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { PORT } from "./config/server.config.js";
// import products from "./data/products.js";
import connectDB from "./db/db.js";
import Product from "./models/product.model.js";

import productRoutes from "./routes/product.routes.js";

const app = express();
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).send({ status: 200, message: "Server is up!" });
});

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
