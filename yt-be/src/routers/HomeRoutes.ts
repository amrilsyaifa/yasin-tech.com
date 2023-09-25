import BaseRoutes from "./BaseRouter";
import HomeController from "../controllers/HomeController";

class HomeRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get("/", HomeController.index);
    this.router.get("/our-enggagement", HomeController.ourEngagement);
  }
}

export default new HomeRoutes().router;
