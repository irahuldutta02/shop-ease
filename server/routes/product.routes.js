import express from "express";
import {
  getProductById,
  getProducts,
} from "../controllers/product.controller.js";
import { admin, protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

export default router;
