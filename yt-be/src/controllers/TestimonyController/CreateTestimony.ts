import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import { join } from "path";
import { rename, stat, mkdir } from "fs/promises";

import Testimony, { ITestimony, TTestimony } from "../../models/TestimonyModel";
import { ErrorResponse, SuccessResponse } from "../../helpers/Responses";
import { ICreateTestimony } from "./interface";
import { TestimonySchema } from "../../validations/TestimonyValidation";
import getIDFromToken from "../../helpers/getIDFromToken";

const CreateTestimony = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const base_location = process.env.ROOT_DIR || process.cwd();
    const propsCreate: ICreateTestimony = req.body;
    const response = TestimonySchema.safeParse(propsCreate);

    if (!response.success) {
      const { formErrors } = response.error;
      return ErrorResponse({
        res,
        status: HttpStatusCodes.BAD_REQUEST,
        message: "Invalid request",
        data: formErrors.fieldErrors,
      });
    }

    let image = propsCreate.image;
    const splitData = propsCreate.image.split("/");
    const id = splitData[splitData.length - 2];
    const img = splitData[splitData.length - 1];
    const oldPath = join(base_location, `public/uploads/temp/${id}/${img}`);

    const newPath = join(base_location, `public/uploads/file/${id}`);

    try {
      await stat(newPath);
    } catch (e: any) {
      if (e.code === "ENOENT") {
        await mkdir(newPath, { recursive: true });
      } else {
        return ErrorResponse({
          res,
          status: HttpStatusCodes.BAD_REQUEST,
          message: "Invalid request",
          data: e,
        });
      }
    }

    rename(oldPath, `${newPath}/${img}`);

    image = propsCreate.image?.replace("/uploads/temp/", "/uploads/file/");
    const idFromToken = (await getIDFromToken(req)) as string;
    const payload: TTestimony = {
      ...propsCreate,
      author: idFromToken,
      image,
    };
    const testimony: ITestimony = await Testimony.create(payload);

    return SuccessResponse({
      res,
      status: HttpStatusCodes.ACCEPTED,
      message: "success create testimony",
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

export default CreateTestimony;
