import BaseRoutes from "./BaseRouter";
import ProfileController from "../controllers/ProfileController";
import PrivateRoute from "../middlewares/PrivateRouteMiddleware";

class ProfileRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get("/my-profile", PrivateRoute, ProfileController.myProfile);
  }
}

export default new ProfileRoutes().router;
