import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";

import Testimony, { ITestimony } from "../../models/TestimonyModel";
import { ErrorResponse, SuccessResponse } from "../../helpers/Responses";

const GetAllTestimony = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const status = req.query.status;
    const testimony: ITestimony[] = await Testimony.find({ status }).populate({
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
      message: "success get all testimony",
      data: testimony,
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

export default GetAllTestimony;
