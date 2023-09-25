import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";

import { ErrorResponse, SuccessResponse } from "../../helpers/Responses";
import Post, { IPost } from "../../models/PostModel";

const GetPosts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const posts: IPost[] | null = await Post.find({
      status: "publish",
    })
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
      message: "success get posts data",
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

export default GetPosts;
