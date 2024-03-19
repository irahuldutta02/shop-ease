import asyncHandler from "express-async-handler";
import Product from "../models/product.model.js";

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ status: 200, data: products });
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json({ status: 200, data: product });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
