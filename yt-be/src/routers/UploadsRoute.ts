import BaseRoutes from "./BaseRouter";
import UploadController from "../controllers/UploadController";
import PrivateRoute from "../middlewares/PrivateRouteMiddleware";

class UploadsRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post(
      "/image",
      PrivateRoute,
      UploadController.uploadImageSingle
    );
  }
}

export default new UploadsRoutes().router;
