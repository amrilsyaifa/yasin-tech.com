import { Request, Response } from "express";
import Login from "./Login";
import Register from "./Register";
import LoginGoogle from "./LoginGoogle";
import Logout from "./Logout";
import RefreshToken from "./RefreshToken";
import ValidateUserIdTemp from "./ValidateUserIdTemp";
import RegisterRemaining from "./RegisterRemaining";

interface IAuthController {
  login(req: Request, res: Response): Response | Promise<Response>;
  loginGoogle(req: Request, res: Response): Response | Promise<Response>;
  register(req: Request, res: Response): Response | Promise<Response>;
  logout(req: Request, res: Response): Response | Promise<Response>;
  refreshToken(req: Request, res: Response): Response | Promise<Response>;
  validateUserIdTemp(req: Request, res: Response): Response | Promise<Response>;
  registerRemaining(req: Request, res: Response): Response | Promise<Response>;
}

class AuthController implements IAuthController {
  async login(req: Request, res: Response): Promise<Response> {
    return Login(req, res);
  }
  async loginGoogle(req: Request, res: Response): Promise<Response> {
    return LoginGoogle(req, res);
  }
  async register(req: Request, res: Response): Promise<Response> {
    return Register(req, res);
  }
  async logout(req: Request, res: Response): Promise<Response> {
    return Logout(req, res);
  }
  async refreshToken(req: Request, res: Response): Promise<Response> {
    return RefreshToken(req, res);
  }
  async validateUserIdTemp(req: Request, res: Response): Promise<Response> {
    return ValidateUserIdTemp(req, res);
  }
  async registerRemaining(req: Request, res: Response): Promise<Response> {
    return RegisterRemaining(req, res);
  }
}

export default new AuthController();
