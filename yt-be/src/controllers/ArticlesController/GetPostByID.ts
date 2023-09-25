import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";

import { ErrorResponse, SuccessResponse } from "../../helpers/Responses";
import Post, { IPost } from "../../models/PostModel";

const GetPostByID = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const posts: IPost | null = await Post.findOne({ slug: id })
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
      message: "success get post data",
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

export default GetPostByID;
