import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./configs/Database";

// Routers
import AuthRoutes from "./routers/AuthRoutes";
import ArticlesRoutes from "./routers/ArticlesRoutes";
import UserRoutes from "./routers/UserRoutes";
import SeedRoutes from "./routers/SeedRoutes";
import HomeRoutes from "./routers/HomeRoutes";
import ProfileRoutes from "./routers/ProfileRoutes";
import PostRoutes from "./routers/PostRoutes";
import UploadsRoute from "./routers/UploadsRoute";
import RoleRoutes from "./routers/RoleRoutes";
import TagRoutes from "./routers/TagRoutes";
import TestimonyRoutes from "./routers/TestimonyRoutes";
import getEnvToVar from "./helpers/getEnvToVar";

connectDB();

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(bodyParser.json());
    this.app.use(morgan("dev"));
    this.app.use(compression());
    this.app.use(
      helmet({
        crossOriginResourcePolicy: getEnvToVar("NODE_ENV") !== "development",
      })
    );
    this.app.use(cors({ credentials: true }));
    this.app.use(cookieParser());
    this.app.use(express.static("./public"));
  }

  protected routes(): void {
    this.app.route("/api/health").get((req: Request, res: Response) => {
      res.status(200).json({ message: "Hi there 👋" });
    });

    this.app.use("/api/articles", ArticlesRoutes);
    this.app.use("/api/auth", AuthRoutes);
    this.app.use("/api/home", HomeRoutes);
    this.app.use("/api/profile", ProfileRoutes);
    this.app.use("/api/post", PostRoutes);
    this.app.use("/api/users", UserRoutes);
    this.app.use("/api/upload", UploadsRoute);
    this.app.use("/api/role", RoleRoutes);
    this.app.use("/api/tag", TagRoutes);
    this.app.use("/api/testimony", TestimonyRoutes);

    // Seeds
    this.app.use("/api/seeds", SeedRoutes);
  }
}

const port: number = Number(process.env.APP_PORT) || 8000;

const app = new App().app;
app.listen(port, () => {
  console.log("this app running in " + port);
});
