import { Request, Response } from "express";
import _ from "lodash";
import HttpStatusCodes from "http-status-codes";
import User, { IUser } from "../models/UserModel";
import { ErrorResponse, SuccessResponse } from "../helpers/Responses";
import { identityToken } from "../constant/token";
import { verifyJWT } from "../helpers/tokenHelper";

interface IProfileController {
  myProfile(req: Request, res: Response): Response | Promise<Response>;
}

class ProfileController implements IProfileController {
  async myProfile(req: Request, res: Response): Promise<Response> {
    try {
      let token: string | undefined;
      if (req.cookies && req.cookies?.[identityToken]) {
        token = req.cookies[identityToken];
      } else if (req.headers.authorization) {
        token = req.headers.authorization.replace("Bearer ", "");
      }
      if (!token) {
        return ErrorResponse({
          res,
          status: HttpStatusCodes.BAD_REQUEST,
          message: "Invalid request",
        });
      }

      const props = await verifyJWT<{
        sub: string;
        isRefreshToken?: boolean;
      }>(token as string);
      const { sub } = props;

      const myProfile: IUser | null = await User.findById(sub)
        .populate("profile")
        .populate("role");

      const transformDataProfile = _.mapKeys(
        myProfile?.toJSON(),
        (_, key: string) => {
          if (key === "profile_id") return "profile";
          if (key === "role_id") return "role";
          return key;
        }
      );

      return SuccessResponse({
        res,
        status: HttpStatusCodes.ACCEPTED,
        message: "success get my profile",
        data: transformDataProfile,
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

export default new ProfileController();
