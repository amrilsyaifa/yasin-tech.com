import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";

import Post from "../../models/PostModel";
import { ErrorResponse, SuccessResponse } from "../../helpers/Responses";
import getIDFromToken from "../../helpers/getIDFromToken";

const GetByIdPost = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { params } = req;
    const posts = await Post.findOne({ slug: params.id })
      .populate({
        path: "author",
        model: "User",
        populate: {
          path: "profile",
          model: "Profile",
        },
      })
      .populate("tags");

    return SuccessResponse({
      res,
      status: HttpStatusCodes.ACCEPTED,
      message: "success get post",
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

export default GetByIdPost;
