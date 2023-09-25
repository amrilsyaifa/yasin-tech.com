import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import CryptoJS from "crypto-js";

import { ErrorResponse, SuccessResponse } from "../../helpers/Responses";
import { LoginSchema } from "../../validations/AuthValidation";
import User, { IUser } from "../../models/UserModel";
import { processNewToken } from "../../helpers/tokenHelper";
import { identityRefreshToken, identityToken } from "../../constant/token";
import getEnvToVar from "../../helpers/getEnvToVar";
import { secretCryptoAes } from "../../constant/bcrypt";
import { compare } from "bcryptjs";

const Login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const response = LoginSchema.safeParse(req.body);

    if (!response.success) {
      const { formErrors } = response.error;
      return ErrorResponse({
        res,
        status: HttpStatusCodes.BAD_REQUEST,
        message: "Invalid request",
        data: formErrors,
      });
    }

    const user: IUser | null = await User.findOne({
      $or: [
        { username: response.data.username },
        { email: response.data.username },
      ],
    });
    if (!user) {
      return ErrorResponse({
        res,
        status: HttpStatusCodes.BAD_REQUEST,
        message: "Invalid email or password",
      });
    }
    const userJson = user.toJSON();
    const splitPassword = userJson.password.split("|-_-|");
    const bytes = CryptoJS.AES.decrypt(splitPassword[1], secretCryptoAes);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    const isCorrectBcrypt = await compare(
      response.data.password,
      splitPassword[0]
    );
    const isCorrectCrypto = originalText === response.data.password;

    if (!(isCorrectBcrypt && isCorrectCrypto)) {
      return ErrorResponse({
        res,
        status: HttpStatusCodes.BAD_REQUEST,
        message: "Invalid email or password",
      });
    }
    const cookieOptions = await processNewToken(user.id);
    res.cookie(identityToken, cookieOptions.token, {
      maxAge: cookieOptions.maxAge,
      secure: getEnvToVar("NODE_ENV") !== "development",
      path: "/",
      httpOnly: true,
      sameSite: "none",
    });

    res.cookie(identityRefreshToken, cookieOptions.refreshToken, {
      maxAge: cookieOptions.maxAgeRefresh,
      secure: getEnvToVar("NODE_ENV") !== "development",
      path: "/",
      httpOnly: true,
      sameSite: "none",
    });

    return SuccessResponse({
      res,
      status: HttpStatusCodes.ACCEPTED,
      message: "success login",
      data: {
        token: cookieOptions.token,
        refresh_token: cookieOptions.refreshToken,
      },
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

export default Login;
