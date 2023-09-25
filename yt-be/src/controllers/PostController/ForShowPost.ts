import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";

import Post from "../../models/PostModel";
import { ErrorResponse, SuccessResponse } from "../../helpers/Responses";
import { IUpdateForShowPost } from "./interface";
import { ForShowPostAPISchema } from "../../validations/PostValidation";

const UpdateByIdPost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const propsUpdate: IUpdateForShowPost = req.body;
    const response = ForShowPostAPISchema.safeParse(propsUpdate);

    if (!response.success) {
      const { formErrors } = response.error;
      return ErrorResponse({
        res,
        status: HttpStatusCodes.BAD_REQUEST,
        message: "Invalid request",
        data: formErrors,
      });
    }

    const posts = await Post.updateOne(
      {
        _id: id,
      },
      { for_show: response.data.for_show }
    );

    return SuccessResponse({
      res,
      status: HttpStatusCodes.ACCEPTED,
      message: "success update post",
      data: posts,
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

export default UpdateByIdPost;
