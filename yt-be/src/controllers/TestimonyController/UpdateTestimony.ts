import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";

import Testimony, { ITestimony } from "../../models/TestimonyModel";
import { ErrorResponse, SuccessResponse } from "../../helpers/Responses";
import { IUpdateTestimony } from "./interface";

const UpdateTestimony = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const propsUpdate: IUpdateTestimony = req.body;
    const testimony: ITestimony = await Testimony.updateOne(
      { _id: id },
      {
        name: propsUpdate.name,
        company: propsUpdate.company,
        job_title: propsUpdate.job_title,
        desc_ID: propsUpdate.desc_ID,
        desc_EN: propsUpdate.desc_EN,
        status: propsUpdate.status,
        rating: propsUpdate.rating,
        image: propsUpdate.image,
        updated_at: new Date(),
      }
    ).populate({
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

export default UpdateTestimony;
