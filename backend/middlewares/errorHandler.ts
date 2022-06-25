import type { ErrorRequestHandler } from 'express';

export const ErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { statusCode, message } = err;
  console.log(message || err);
  res.status(statusCode || 400).send({ message: message || err });
  next();
};
