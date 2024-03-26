import asyncHandler from "express-async-handler";
import Order from "../models/order.model.js";

const addOrderItems = asyncHandler(async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    } else if (!shippingAddress) {
      res.status(400);
      throw new Error("No shipping address");
    } else if (!paymentMethod) {
      res.status(400);
      throw new Error("No payment method");
    } else if (!itemsPrice) {
      res.status(400);
      throw new Error("No items price");
    } else if (!taxPrice) {
      res.status(400);
      throw new Error("No tax price");
    } else if (!totalPrice) {
      res.status(400);
      throw new Error("No total price");
    } else {
      const order = new Order({
        orderItems: orderItems.map((item) => ({
          ...item,
          product: item._id,
        })),
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOder = await order.save();
      res.status(201).json({
        status: 201,
        message: "Order created",
        data: createdOder,
      });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (order) {
      res.json({
        status: 200,
        message: "Order found",
        data: order,
      });
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const getUserOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "user",
      "name email"
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(400);
    throw new Error("Error Fetching Orders");
  }
});

export { addOrderItems, getOrderById, getUserOrders };
