import { ConnectionOptions } from "typeorm";
import User from "./entities/user.entity";
import Task from "./entities/task.entity";
import Project from "./entities/project.entity";

const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  entities: [User, Task, Project],
};

export = config;
