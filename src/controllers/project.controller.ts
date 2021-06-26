import * as express from "express";
import { getRepository } from "typeorm";
import Project from "../entities/project.entity";
import Controller from "../interfaces/controller.interface";
import { CreateProjectDto } from "../entities/project.dto";
import authMiddleware from "../middleware/auth.middleware";
import validationMiddleware from "../middleware/validation.middleware";

export default class ProjectController implements Controller {
  public path = "/project";
  public router = express.Router();
  private categoryRepo = getRepository(Project);

  constructor() {
    this.router.get(`${this.path}`, this.getAllProjects);
    this.router.get(`${this.path}/:id`, this.getById);
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(CreateProjectDto),
      this.createNewProject
    );
    this.router.delete(
      `${this.path}/:id`,
      authMiddleware,
      this.deleteProjectById
    );
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
    body.date_created = new Date();

    const newProject = this.categoryRepo.create(body);
    await this.categoryRepo.save(newProject);

    res.send(newProject);
  };

  private deleteProjectById = async (req: Request, res: Response) => {
    const id = req.params.id;

    const deletedProject = await this.categoryRepo.delete(id);

    res.send(deletedProject);
  };
}
