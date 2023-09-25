import { Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import Tag, { ITag } from "../models/TagModel";
import { ErrorResponse, SuccessResponse } from "../helpers/Responses";

interface ITagController {
  index(req: Request, res: Response): Response | Promise<Response>;
}

class TagController implements ITagController {
  async index(req: Request, res: Response): Promise<Response> {
    try {
      const status = req.query.status;
      const tags: ITag[] = await Tag.find({ status });
      return SuccessResponse({
        res,
        status: HttpStatusCodes.ACCEPTED,
        message: "success get all tags",
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

export default new TagController();
