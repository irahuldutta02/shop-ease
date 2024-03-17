import { NODE_ENV } from "../config/server.config.js";

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 400;
    message = "Resource not found";
  }

  res.status(statusCode);
  res.json({
    status: statusCode,
    message: message,
    stack: NODE_ENV === "development" ? err.stack : null,
  });
};

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export { errorHandler, notFound };
