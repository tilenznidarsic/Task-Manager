import * as express from "express";
import { getRepository } from "typeorm";
import User from "../entities/user.entity";
import jwt from "jsonwebtoken";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: express.NextFunction
) {
  const cookies = req.cookies;
  const userRepo = getRepository(User);

  if (cookies && cookies.token) {
    try {
      const validated = jwt.verify(cookies.token, process.env.JWT_SECRET);
      const user = userRepo.findOne(validated.id);

      if (user) {
        req.user = user;
        next();
      } else {
        next(new Error("Wrong Auth token!"));
      }
    } catch (err) {
      next(err);
    }
  } else {
    next(new Error("Token missing"));
  }
}
