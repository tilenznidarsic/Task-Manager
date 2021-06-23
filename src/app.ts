import express from "express";
import Controller from "./interfaces/controller.interface";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware";

export default class App {
  private app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    // middleware
    this.app.use(express.json());
    this.app.use(cookieParser());

    //controllers
    this.initializeControllers(controllers);

    // error handling
    this.app.use(errorMiddleware);
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("App serving on port", process.env.PORT);
    });
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }
}
