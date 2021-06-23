import * as express from "express";
import HttpException from "../exceptions/HttpException";

export default function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response
) {
  const statusCode: number = error.status || 500;
  const message: string = error.message || "Something went wrong";

  res.status(statusCode).send({ message, statusCode });
}
