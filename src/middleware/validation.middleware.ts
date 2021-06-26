import { validate, ValidationError } from "class-validator";
import * as express from "express";
import HttpException from "../exceptions/HttpException";
import { plainToClass } from "class-transformer";

export default function validationMiddleware(
  type: any
): express.RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    validate(plainToClass(type, req.body)).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        next(new HttpException(400, "Bad Request!"));
      } else {
        next();
      }
    });
  };
}
