import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";

import { ErrorResponse, SuccessResponse } from "../../helpers/Responses";
import { LoginGoogleSchema } from "../../validations/AuthValidation";
import User, { IUser } from "../../models/UserModel";
import UserTemp, { IUserTemp } from "../../models/UserTempModel";
import { processNewToken } from "../../helpers/tokenHelper";
import { identityRefreshToken, identityToken } from "../../constant/token";
import getEnvToVar from "../../helpers/getEnvToVar";
import { getGoogleUser } from "../../services/session";
import { ILoginGoogleResponse } from "./interface";

const LoginGoogle = async (req: Request, res: Response): Promise<Response> => {
  try {
    const response = LoginGoogleSchema.safeParse(req.body);

    if (!response.success) {
      const { formErrors } = response.error;
      return ErrorResponse({
        res,
        status: HttpStatusCodes.BAD_REQUEST,
        message: "Invalid request",
        data: formErrors,
      });
    }

    const { given_name, family_name, email, picture } = await getGoogleUser({
      access_token: req.body.access_token,
    });

    const userTemp: IUserTemp | null = await UserTemp.findOne({
      email,
    });
    let userId: string = "";
    let userTempId: string = "";
    let returnData: ILoginGoogleResponse | null = null;
    if (userTemp) {
      if (!userTemp.phone_number && !userTemp.username) {
        returnData = {
          is_success: true,
          is_user_exist: true,
          go_to: "register_remaining_data",
        };
      }
      if (userTemp.phone_number && userTemp.username) {
        returnData = {
          is_success: true,
          is_user_exist: true,
          go_to: "on_completed",
        };
      }
      userTempId = userTemp.id;
    }

    if (!userTemp) {
      const user: IUser | null = await User.findOne({
        email,
      });
      if (user) {
        userId = user.id;
        returnData = {
          is_success: true,
          is_user_exist: true,
          go_to: "on_completed",
        };
      }
      if (!user) {
        userId = "";
        returnData = {
          is_success: true,
          is_user_exist: false,
          go_to: "register_remaining_data",
        };
      }
    }

    if (
      !returnData?.is_user_exist &&
      returnData?.go_to === "register_remaining_data"
    ) {
      const usrCreate = await UserTemp.create({
        email: email,
        first_name: given_name,
        last_name: family_name,
        image: picture,
      });

      userTempId = usrCreate.id;
    }

    if (
      returnData?.is_user_exist &&
      returnData?.go_to === "register_remaining_data"
    ) {
      await UserTemp.updateOne(
        {
          email,
        },
        {
          email: email,
          first_name: given_name,
          last_name: family_name,
          image: picture,
        }
      );
    }

    if (
      returnData?.is_success &&
      returnData?.is_user_exist &&
      returnData?.go_to === "on_completed"
    ) {
      const cookieOptions = await processNewToken(userId);
      res.cookie(identityToken, cookieOptions.token, {
        maxAge: cookieOptions.maxAge,
        secure: getEnvToVar("NODE_ENV") !== "development",
        path: "/",
        httpOnly: true,
      });
      res.cookie(identityRefreshToken, cookieOptions.refreshToken, {
        maxAge: cookieOptions.maxAgeRefresh,
        secure: getEnvToVar("NODE_ENV") !== "development",
        path: "/",
        httpOnly: true,
      });
      returnData = { ...returnData, cookie_data: cookieOptions };
    }

    return SuccessResponse({
      res,
      status: HttpStatusCodes.ACCEPTED,
      message: "success login with google",
      data: { ...returnData, user_id: userTempId },
    });
  } catch (error) {
    return ErrorResponse({
      res,
      status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      message: "internal server error",
      data: error,
    });
  }
};

export default LoginGoogle;
