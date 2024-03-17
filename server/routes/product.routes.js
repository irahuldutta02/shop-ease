import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/product.model.js";
import {
  getProductById,
  getProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

router.route("/").get(getProducts);

router.route("/:id").get(getProductById);

export default router;
