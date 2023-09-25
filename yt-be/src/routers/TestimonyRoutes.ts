import BaseRoutes from "./BaseRouter";
import TestimonyController from "../controllers/TestimonyController";
import PrivateRoute from "../middlewares/PrivateRouteMiddleware";

class TestimonyRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get("/", PrivateRoute, TestimonyController.index);
    this.router.post("/", PrivateRoute, TestimonyController.create);
    this.router.get("/:id", PrivateRoute, TestimonyController.getById);
    this.router.put("/:id", PrivateRoute, TestimonyController.update);
  }
}

export default new TestimonyRoutes().router;
