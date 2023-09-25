import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import slug from "slug";

import Role, { IRole, TRole } from "../../models/RoleModel";
import { ErrorResponse, SuccessResponse } from "../../helpers/Responses";
import { ICreateRole } from "./interface";
import { RoleSchema } from "../../validations/RoleValidation";

const CreateRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const props: ICreateRole = req.body;
    const response = RoleSchema.safeParse(props);

    if (!response.success) {
      const { formErrors } = response.error;
      return ErrorResponse({
        res,
        status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
        message: "Invalid request",
        data: formErrors.fieldErrors,
      });
    }

    const slugTransform = slug(props.title);
    const payload: TRole = {
      ...props,
      slug: slugTransform,
    };

    const role: IRole = await Role.create(payload);

    return SuccessResponse({
      res,
      status: HttpStatusCodes.ACCEPTED,
      message: "success create role",
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

export default CreateRole;
