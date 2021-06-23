import * as express from "express";
import { getRepository } from "typeorm";
import Controller from "../interfaces/controller.interface";
import Task from "../entities/task.entity";
import authMiddleware from "../middleware/auth.middleware";

export default class TaskController implements Controller {
  public path = "/tasks";
  public router = express.Router();
  private categoryRepo = getRepository(Task);

  constructor() {
    this.router.get(this.path, this.getAllTasks);
    this.router.post(this.path, authMiddleware, this.createNewTask);
    this.router.patch(
      `${this.path}/:id`,
      authMiddleware,
      this.updateTaskStatus
    );
  }

  private getAllTasks = async (req: express.Request, res: express.Response) => {
    const tasks = await this.categoryRepo.find({
      relations: ["creator", "project"],
    });
    res.send(tasks);
  };

  private createNewTask = async (
    req: express.Request,
    res: express.Response
  ) => {
    const body = req.body;
    const newTask = this.categoryRepo.create(body);
    await this.categoryRepo.save(newTask);
    res.send(newTask);
  };

  private updateTaskStatus = async (
    req: express.Request,
    res: express.Response
  ) => {
    const id = req.params.id;
    const status = req.body;

    await this.categoryRepo.update({ id }, status);

    const updatedTask = await this.categoryRepo.findOne(id);
    res.send(updatedTask);
  };
}
