import "reflect-metadata";
import App from "./app";
import { createConnection } from "typeorm";

import TaskController from "./controllers/task.controller";
import UserController from "./controllers/user.controller";
import AuthController from "./controllers/auth.controller";
import ProjectController from "./controllers/project.controller";

require("dotenv").config();
import * as config from "./ormconfig";

(async () => {
  try {
    const connection = await createConnection(config);
    await connection.runMigrations();
  } catch (err) {
    console.log(err);
    return err;
  }

  const app = new App([
    new TaskController(),
    new UserController(),
    new AuthController(),
    new ProjectController(),
  ]);

  app.listen();
})();
