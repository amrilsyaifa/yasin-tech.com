import BaseRoutes from "./BaseRouter";
import ArticlesController from "../controllers/ArticlesController";

class ArticlesRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get("/posts", ArticlesController.getPosts);
    this.router.get("/posts/:id", ArticlesController.getPostId);
  }
}

export default new ArticlesRoutes().router;
