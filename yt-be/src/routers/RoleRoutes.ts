import BaseRoutes from "./BaseRouter";
import RoleController from "../controllers/RoleController";
import PrivateRoute from "../middlewares/PrivateRouteMiddleware";

class RoleRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get("/", PrivateRoute, RoleController.index);
    this.router.post("/", PrivateRoute, RoleController.create);
    this.router.get("/:id", PrivateRoute, RoleController.getById);
    this.router.delete("/:id", PrivateRoute, RoleController.detele);
  }
}

export default new RoleRoutes().router;
