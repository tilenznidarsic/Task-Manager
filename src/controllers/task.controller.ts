import * as express from "express";
import { getRepository } from "typeorm";
import Controller from "../interfaces/controller.interface";
import Task from "../entities/task.entity";
import HttpException from "../exceptions/HttpException";
import authMiddleware from "../middleware/auth.middleware";
import validationMiddleware from "../middleware/validation.middleware";
import { UpdateTaskDto, TaskDto } from "../entities/task.dto";

export default class TaskController implements Controller {
  public path = "/tasks";
  public router = express.Router();
  private categoryRepo = getRepository(Task);

  constructor() {
    this.router.get(this.path, this.getAllTasks);
    this.router.post(
      this.path,
      authMiddleware,
      validationMiddleware(TaskDto),
      this.createNewTask
    );
    this.router.patch(
      `${this.path}/:id`,
      authMiddleware,
      validationMiddleware(UpdateTaskDto),
      this.updateTaskStatus
    );
    this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteTaskById);
  }

  private getAllTasks = async (req: Request, res: Response) => {
    const tasks = await this.categoryRepo.find({
      relations: ["creator", "project"],
    });
    res.send(tasks);
  };

  private createNewTask = async (
    req: Request,
    res: Response,
    next: express.NextFunction
  ) => {
    const newTask = req.body;
    newTask.creator = req.user;

    try {
      const createdTask = this.categoryRepo.create(newTask);
      await this.categoryRepo.save(createdTask);

      res.send(createdTask);
    } catch (err) {
      next(new HttpException(400, "Check if project exists!"));
    }
  };

  private updateTaskStatus = async (
    req: Request,
    res: Response,
    next: express.NextFunction
  ) => {
    const id = req.params.id;
    const status = req.body;

    try {
      await this.categoryRepo.update({ id }, status);
      const updatedTask = await this.categoryRepo.findOne(id);

      res.send(updatedTask);
    } catch (err) {
      next(new HttpException(400, "Check status and task id!"));
    }
  };

  private deleteTaskById = async (req: Request, res: Response) => {
    const id = req.params.id;

    const deletedTask = await this.categoryRepo.delete(id);

    res.send(deletedTask);
  };
}
