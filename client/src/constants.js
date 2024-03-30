import { ENV } from "../config/server.config";

export const BASE_URL = "";
export const BACKEND_URL =
  ENV === "development"
    ? "http://localhost:5000"
    : "https://shop-ease-a7ya.onrender.com";
export const PRODUCTS_URL = "/api/products";
export const USERS_URL = "/api/users";
export const ORDERS_URL = "/api/orders";
