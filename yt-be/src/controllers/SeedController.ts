import { Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import { ErrorResponse, SuccessResponse } from "../helpers/Responses";
import Role, { TRole, IRole } from "../models/RoleModel";
import Tag, { TTag, ITag } from "../models/TagModel";
import { RolesSchema, TagsSchema } from "../validations/SeedValidation";

interface ISeedController {
  roles(req: Request, res: Response): Response | Promise<Response>;
  tags(req: Request, res: Response): Response | Promise<Response>;
}

class SeedController implements ISeedController {
  async roles(req: Request, res: Response): Promise<Response> {
    try {
      const response = RolesSchema.safeParse(req.body);
      if (!response.success) {
        const { formErrors } = response.error;
        return ErrorResponse({
          res,
          status: HttpStatusCodes.BAD_REQUEST,
          message: "Invalid request",
          data: formErrors.fieldErrors,
        });
      }
      const roleParams: TRole[] = response.data.roles;
      const roles: IRole[] = await Role.insertMany(roleParams);

      return SuccessResponse({
        res,
        status: HttpStatusCodes.CREATED,
        message: "success insert seed roles",
        data: roles,
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
  async tags(req: Request, res: Response): Promise<Response> {
    try {
      const response = TagsSchema.safeParse(req.body);
      if (!response.success) {
        const { formErrors } = response.error;
        return ErrorResponse({
          res,
          status: HttpStatusCodes.BAD_REQUEST,
          message: "Invalid request",
          data: formErrors.fieldErrors,
        });
      }

      const tagsParam: TTag[] = response.data.tags;
      const tags: ITag[] = await Tag.insertMany(tagsParam);

      return SuccessResponse({
        res,
        status: HttpStatusCodes.CREATED,
        message: "success insert seed tags",
        data: tags,
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

export default new SeedController();
