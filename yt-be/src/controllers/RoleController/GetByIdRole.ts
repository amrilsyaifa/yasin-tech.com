import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";

import Role from "../../models/RoleModel";
import { ErrorResponse, SuccessResponse } from "../../helpers/Responses";

const GetByIdRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.query;

    const role = await Role.findById(id);

    return SuccessResponse({
      res,
      status: HttpStatusCodes.ACCEPTED,
      message: "success get role",
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

export default GetByIdRole;
