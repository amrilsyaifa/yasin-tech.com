import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";

import Testimony, { ITestimony } from "../../models/TestimonyModel";
import { ErrorResponse, SuccessResponse } from "../../helpers/Responses";

const GetByIdTestimony = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const testimony: ITestimony | null = await Testimony.findById(id).populate({
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
      message: "success get testimony",
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

export default GetByIdTestimony;
