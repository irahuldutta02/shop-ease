import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  editProduct,
  getProductById,
  getProducts,
  getReviews,
} from "../controllers/product.controller.js";
import { admin, protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);
router.route("/create").post(protect, admin, createProduct);
router.route("/update/:id").put(protect, admin, editProduct);
router.route("/delete/:id").delete(protect, admin, deleteProduct);
router.route("/reviews/:id").get(getReviews);
router.route("/reviews/create/:id").patch(protect, createProductReview);

export default router;
