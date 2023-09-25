import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";

import Post from "../../models/PostModel";
import { ErrorResponse, SuccessResponse } from "../../helpers/Responses";
import getIDFromToken from "../../helpers/getIDFromToken";
import { QueryDataPost, Status } from "./interface";

const GetAllPost = async (req: Request, res: Response): Promise<Response> => {
  try {
    const status = req?.query?.status as Status;
    const for_show = req.query.for_show ? true : undefined;
    const idFromToken = await getIDFromToken(req);
    let queryData: QueryDataPost = { author: idFromToken };

    if (status) {
      queryData = { ...queryData, status };
    }

    if (for_show) {
      queryData = { ...queryData, for_show: true };
    }

    const posts = await Post.find(queryData)
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
      message: "success get all post",
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

export default GetAllPost;
