import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { PORT } from "./config/server.config.js";
import { getProductById, getProducts } from "./data/products.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).send({ status: 200, message: "Server is up!" });
});

app.get("/api/products", (req, res) => {
  return res.status(200).send({ status: 200, data: getProducts() });
});

app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = getProductById(productId);
  if (product) {
    return res.status(200).send({ status: 200, data: product });
  }
  return res.status(404).send({ status: 404, message: "Product not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
