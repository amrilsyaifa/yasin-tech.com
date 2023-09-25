import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";

import Post from "../../models/PostModel";
import { ErrorResponse, SuccessResponse } from "../../helpers/Responses";
import { IUpdatePost } from "./interface";

const UpdateByIdPost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const propsUpdate: IUpdatePost = req.body;
    const posts = await Post.updateOne(
      {
        slug: id,
      },
      { ...propsUpdate }
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
