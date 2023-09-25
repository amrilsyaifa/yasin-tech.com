import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";

import Role from "../../models/RoleModel";
import { ErrorResponse, SuccessResponse } from "../../helpers/Responses";

const DeleteRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.query;

    const role = await Role.deleteOne({ _id: id });

    return SuccessResponse({
      res,
      status: HttpStatusCodes.ACCEPTED,
      message: "role deleted successfully",
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

export default DeleteRole;
