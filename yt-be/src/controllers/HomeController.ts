import { Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import Post, { IPost } from "../models/PostModel";
import Testimony, { ITestimony } from "../models/TestimonyModel";
import { ErrorResponse, SuccessResponse } from "../helpers/Responses";

interface IHomeController {
  index(req: Request, res: Response): Response | Promise<Response>;
  ourEngagement(req: Request, res: Response): Response | Promise<Response>;
}

class HomeController implements IHomeController {
  async index(req: Request, res: Response): Promise<Response> {
    try {
      const insights: IPost[] | null = await Post.find({
        status: "publish",
        for_show: true,
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

      const testimonies: ITestimony[] | null = await Testimony.find({
        status: "publish",
      }).populate({
        path: "author",
        model: "User",
        populate: {
          path: "profile",
          model: "Profile",
        },
      });
      return SuccessResponse({
        res,
        status: HttpStatusCodes.ACCEPTED,
        message: "success get all data",
        data: { insights, testimonies },
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
  async ourEngagement(req: Request, res: Response): Promise<Response> {
    try {
      const testimonies: ITestimony[] | null = await Testimony.find({
        status: "publish",
      }).populate({
        path: "author",
        model: "User",
        populate: {
          path: "profile",
          model: "Profile",
        },
      });
      return SuccessResponse({
        res,
        status: HttpStatusCodes.ACCEPTED,
        message: "success get data",
        data: testimonies,
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

export default new HomeController();
