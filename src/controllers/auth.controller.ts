import * as express from "express";
import { getRepository } from "typeorm";
import User from "../entities/user.entity";
import Controller from "../interfaces/controller.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserAlreadyExists from "../exceptions/UsetAlreadyExists";
import WrongCredentials from "../exceptions/WrongCredentials";

export default class AuthController implements Controller {
  public path = "/auth";
  public router = express.Router();
  private categoryRepo = getRepository(User);

  constructor() {
    this.router.post(`${this.path}/login`, this.loginUser);
    this.router.post(`${this.path}/register`, this.registerUser);
  }

  private loginUser = async (
    req: Request,
    res: Response,
    next: express.NextFunction
  ) => {
    const body: any = req.body;

    const user = await this.categoryRepo.findOne({ username: body.username });

    if (user && (await bcrypt.compare(body.password, user.password))) {
      res.cookie("token", generateToken(user));

      res.status(201).send("OK");
    } else {
      next(new WrongCredentials());
    }
  };

  private registerUser = async (
    req: Request,
    res: Response,
    next: express.NextFunction
  ) => {
    const body: any = req.body;

    if (await this.categoryRepo.findOne({ username: body.username })) {
      next(new UserAlreadyExists());
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = this.categoryRepo.create({
      ...body,
      password: hashedPassword,
    });

    await this.categoryRepo.save(user);
    user.password = undefined;

    res.send(user);
  };
}

function generateToken(user: User) {
  const userToken = {
    id: user.id,
  };

  return jwt.sign(userToken, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
}
