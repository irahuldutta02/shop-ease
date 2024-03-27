import express from "express";
import {
  addOrderItems,
  getOrderById,
  getOrders,
  getUserOrders,
  updateOrderToDelivered,
} from "../controllers/order.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/user-orders").get(protect, getUserOrders); // sequence is important
router.route("/:id").get(protect, getOrderById);
router.route("/deliver/:id").patch(protect, admin, updateOrderToDelivered);

export default router;
