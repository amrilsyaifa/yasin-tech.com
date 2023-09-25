import BaseRoutes from "./BaseRouter";
import PostController from "../controllers/PostController";
import PrivateRoute from "../middlewares/PrivateRouteMiddleware";

class PostRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get("/", PrivateRoute, PostController.getAll);
    this.router.post("/", PrivateRoute, PostController.create);
    this.router.get("/:id", PrivateRoute, PostController.getById);
    this.router.put("/:id", PrivateRoute, PostController.update);
    this.router.put("/for-show/:id", PrivateRoute, PostController.forShow);
  }
}

export default new PostRoutes().router;
