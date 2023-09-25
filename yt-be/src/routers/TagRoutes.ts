import BaseRoutes from "./BaseRouter";
import TagController from "../controllers/TagController";
import PrivateRoute from "../middlewares/PrivateRouteMiddleware";

class TagRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get("/", PrivateRoute, TagController.index);
  }
}

export default new TagRoutes().router;
