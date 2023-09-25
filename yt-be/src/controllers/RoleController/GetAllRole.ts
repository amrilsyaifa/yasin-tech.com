import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";

import Role, { IRole } from "../../models/RoleModel";
import { ErrorResponse, SuccessResponse } from "../../helpers/Responses";

const GetAllRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const role: IRole[] = await Role.find();

    return SuccessResponse({
      res,
      status: HttpStatusCodes.ACCEPTED,
      message: "success get all role",
      data: role,
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

export default GetAllRole;
