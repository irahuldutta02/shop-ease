import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { CLIENT_URL, PORT } from "./config/server.config.js";
import connectDB from "./db/db.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";

import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import orderRoutes from "./routes/oder.routes.js";

import passport from "./utils/passport.js";
import stripeUtil from "./utils/stripe.js";

const app = express();
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://shop-ease-rd.vercel.app");
  next();
});

app.use(
  cors({
    origin: ["https://shop-ease-rd.vercel.app"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
passport(app);
stripeUtil(app);

app.get("/", (req, res) => {
  return res.status(200).send({ status: 200, message: "Server is up!" });
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// changed to check the git
