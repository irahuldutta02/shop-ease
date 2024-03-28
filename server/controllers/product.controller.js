import asyncHandler from "express-async-handler";
import Product from "../models/product.model.js";

export const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ status: 200, data: products });
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

export const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json({ status: 200, data: product });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

export const createProduct = asyncHandler(async (req, res) => {
  try {
    const product = new Product({
      user: req.user._id,
      name: req.body.name,
      image: req.body.image,
      brand: req.body.brand,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      countInStock: req.body.countInStock,
      numReviews: 0,
      rating: 0,
    });

    const createdProduct = await product.save();

    res.status(201).json({ status: 201, data: createdProduct });
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: req.params.id });
      res
        .status(200)
        .json({ status: 200, message: "Product deleted", data: product });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

export const editProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      product.image = req.body.image || product.image;
      product.brand = req.body.brand || product.brand;
      product.category = req.body.category || product.category;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;
      product.countInStock = req.body.countInStock || product.countInStock;

      const updatedProduct = await product.save();

      res.status(200).json({ status: 200, data: updatedProduct });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

export const createProductReview = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating = Number(
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length
      ).toFixed(2);

      await product.save();
      res.status(201).json({ status: 201, message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error?.message || "Internal Server Error");
  }
});

export const getReviews = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.status(200).json({ status: 200, data: product.reviews });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});
