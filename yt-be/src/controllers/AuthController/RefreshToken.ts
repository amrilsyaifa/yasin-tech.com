import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";

import { ErrorResponse, SuccessResponse } from "../../helpers/Responses";
import { identityRefreshToken, identityToken } from "../../constant/token";
import { processNewToken, verifyJWT } from "../../helpers/tokenHelper";
import getEnvToVar from "../../helpers/getEnvToVar";

const RefreshToken = async (req: Request, res: Response): Promise<Response> => {
  try {
    let token: string | undefined;

    if (req.cookies && req.cookies?.[identityRefreshToken]) {
      token = req.cookies[identityRefreshToken];
    } else if (req.headers.authorization) {
      token = req.headers.authorization.replace("Bearer ", "");
    }

    if (req.cookies && req.cookies?.[identityToken] && !token) {
      token = req.cookies[identityToken];
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
      is_refresh_token?: boolean;
    }>(token);
    const { sub, is_refresh_token } = props;

    if (!is_refresh_token) {
      return SuccessResponse({
        res,
        status: HttpStatusCodes.UNAUTHORIZED,
        message: "Refresh token is invalid",
      });
    }

    const cookieOptions = await processNewToken(sub);
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

export default RefreshToken;
