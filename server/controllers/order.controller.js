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

export { addOrderItems };
