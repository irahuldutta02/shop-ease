import express from "express";
import Product from "../models/product.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).send({ status: 200, data: products });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).send({ status: 500, message: "Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    return res.status(200).send({ status: 200, data: product });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(404).send({ status: 404, message: "Product not found" });
  }
});

export default router;
