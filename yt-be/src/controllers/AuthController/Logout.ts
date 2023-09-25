import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";

import { ErrorResponse, SuccessResponse } from "../../helpers/Responses";
import { identityRefreshToken, identityToken } from "../../constant/token";

const Logout = async (req: Request, res: Response): Promise<Response> => {
  try {
    res.clearCookie(identityToken, {
      path: "/",
      httpOnly: true,
    });
    res.clearCookie(identityRefreshToken, {
      path: "/",
      httpOnly: true,
    });

    return SuccessResponse({
      res,
      status: HttpStatusCodes.ACCEPTED,
      message: "success logout",
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

export default Logout;
