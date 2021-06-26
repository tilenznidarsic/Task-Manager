import * as express from "express";
import HttpException from "../exceptions/HttpException";

// 4 params required for error middleware functions
export default function errorMiddleware(
  err: HttpException,
  req: Request,
  res: Response,
  next: express.NextFunction
) {
  const statusCode: number = err.status || 500;
  const message: string = err.message || "Something went wrong";

  res.status(statusCode).send({ message, statusCode });
}
