import BaseRoutes from "./BaseRouter";
import SeedMiddleware from "../middlewares/SeedMiddleware";
import SeedController from "../controllers/SeedController";

class SeedRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("/roles", SeedMiddleware, SeedController.roles);
    this.router.post("/tags", SeedMiddleware, SeedController.tags);
  }
}

export default new SeedRoutes().router;
