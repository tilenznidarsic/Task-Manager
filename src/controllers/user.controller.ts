import * as express from "express";
import { getRepository } from "typeorm";
import User from "../entities/user.entity";
import Controller from "../interfaces/controller.interface";

export default class UserController implements Controller {
  public path = "/users";
  public router = express.Router();
  private categoryRepo = getRepository(User);

  constructor() {
    this.router.get(this.path, this.getAllUsers);
  }

  private getAllUsers = async (req: express.Request, res: express.Response) => {
    const users = await this.categoryRepo.find({ relations: ["tasks"] });
    res.send(users);
  };
}
