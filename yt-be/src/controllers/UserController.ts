import { Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import User, { IUser } from "../models/UserModel";
import { ErrorResponse, SuccessResponse } from "../helpers/Responses";

interface IUserController {
  index(req: Request, res: Response): Response | Promise<Response>;
}

class UserController implements IUserController {
  async index(req: Request, res: Response): Promise<Response> {
    try {
      const users: IUser[] | null = await User.find();
      return SuccessResponse({
        res,
        status: HttpStatusCodes.ACCEPTED,
        message: "success get all users",
        data: users,
      });
    } catch (error) {
      return ErrorResponse({
        res,
        status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
        message: "internal server error",
        data: error,
      });
    }
  }
}

export default new UserController();
