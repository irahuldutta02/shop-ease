import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { PORT } from "./config/server.config.js";
import connectDB from "./db/db.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";

import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.status(200).send({ status: 200, message: "Server is up!" });
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
