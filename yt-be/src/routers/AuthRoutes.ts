import BaseRoutes from "./BaseRouter";
import AuthController from "../controllers/AuthController";

class AuthRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("/login", AuthController.login);
    this.router.post("/login-google", AuthController.loginGoogle);
    this.router.post("/register", AuthController.register);
    this.router.get("/logout", AuthController.logout);
    this.router.post("/refresh-token", AuthController.refreshToken);
    this.router.get("/validate-userid-temp", AuthController.validateUserIdTemp);
    this.router.put(
      "/register-remaining/:id",
      AuthController.registerRemaining
    );
  }
}

export default new AuthRoutes().router;
