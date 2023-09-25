import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import CryptoJS from "crypto-js";

import { ErrorResponse, SuccessResponse } from "../../helpers/Responses";
import { ValidateUserTempByIdSchema } from "../../validations/AuthValidation";
import UserTemp, { IUserTemp } from "../../models/UserTempModel";
import { secretCryptoAes } from "../../constant/bcrypt";
import { ytHeader } from "../../constant/token";

const ValidateUserIdTemp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { method, query } = req;
    const response = ValidateUserTempByIdSchema.safeParse(query);

    if (!response.success) {
      const { formErrors } = response.error;
      return ErrorResponse({
        res,
        status: HttpStatusCodes.BAD_REQUEST,
        message: "Invalid request",
        data: formErrors,
      });
    }
    let token: string | undefined;

    if (req.headers?.[ytHeader]) {
      token = req.headers?.[ytHeader] as string;
    }

    if (!token) {
      return ErrorResponse({
        res,
        status: HttpStatusCodes.BAD_REQUEST,
        message: "Invalid request",
      });
    }
    const id = query?.identify;
    const usr: IUserTemp | null = await UserTemp.findOne({
      _id: id,
    });

    if (!usr) {
      return ErrorResponse({
        res,
        status: HttpStatusCodes.BAD_REQUEST,
        message: "Invalid request",
      });
    }

    const bytes = CryptoJS.AES.decrypt(token, secretCryptoAes);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    if (originalText !== usr?.id) {
      return ErrorResponse({
        res,
        status: HttpStatusCodes.BAD_REQUEST,
        message: "Invalid request",
      });
    }

    return SuccessResponse({
      res,
      status: HttpStatusCodes.ACCEPTED,
      message: "success validate user id",
      data: usr,
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

export default ValidateUserIdTemp;
