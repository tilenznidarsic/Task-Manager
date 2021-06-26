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
    this.router.get(`${this.path}/:id`, this.getUserById);
  }

  private getAllUsers = async (req: Request, res: Response) => {
    const users = await this.categoryRepo.find({ relations: ["tasks"] });
    res.send(users);
  };

  private getUserById = async (req: Request, res: Response) => {
    const id = req.params.id;

    const user = await this.categoryRepo.findOne(id);

    res.send(user);
  };
}
