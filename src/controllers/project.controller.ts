import * as express from "express";
import { getRepository } from "typeorm";
import Project from "../entities/project.entity";
import Controller from "../interfaces/controller.interface";
import authMiddleware from "../middleware/auth.middleware";

export default class ProjectController implements Controller {
  public path = "/project";
  public router = express.Router();
  private categoryRepo = getRepository(Project);

  constructor() {
    this.router.get(`${this.path}`, this.getAllProjects);
    this.router.get(`${this.path}/:id`, this.getById);
    this.router.post(`${this.path}`, authMiddleware, this.createNewProject);
  }

  private getAllProjects = async (req: Request, res: Response) => {
    const all = await this.categoryRepo.find({ relations: ["tasks"] });

    res.send(all);
  };

  private getById = async (req: Request, res: Response) => {
    const id = req.params.id;

    const project = await this.categoryRepo.findOne(id);

    res.send(project);
  };

  private createNewProject = async (req: Request, res: Response) => {
    const body: any = req.body;
    body.date = new Date();

    const newProject = this.categoryRepo.create(body);
    await this.categoryRepo.save(newProject);

    res.send(newProject);
  };
}
