import express from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProductById,
  getProducts,
} from "../controllers/product.controller.js";
import { admin, protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);
router.route("/create").post(protect, admin, createProduct);
router.route("/update/:id").put(protect, admin, editProduct);
router.route("/delete/:id").delete(protect, admin, deleteProduct);

export default router;
