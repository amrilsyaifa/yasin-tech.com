import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";

import UploadFileTemp, {
  IUploadFileTemp,
  TUploadFileTemp,
} from "../../models/UploadFileTempModel";
import { ErrorResponse, SuccessResponse } from "../../helpers/Responses";
import ImageUpload from "../../services/Uploads/ImageUpload";
import { MediaFile } from "./interface";
import getTypeFile from "../../helpers/getTypeFile";
import getEnvToVar from "../../helpers/getEnvToVar";

const UploadImageSingle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { files, id } = await ImageUpload(req);
    const media = files.media as MediaFile[];

    const type = getTypeFile(media[0].mimetype);
    const payload: TUploadFileTemp = {
      name: media[0].originalFilename,
      type,
      slug: media[0].newFilename,
      author: id,
    };
    const saveToDb: IUploadFileTemp = await UploadFileTemp.create(payload);

    return SuccessResponse({
      res,
      status: HttpStatusCodes.ACCEPTED,
      message: "success upload image",
      data: {
        url: `${getEnvToVar("BASE_URL")}/uploads/temp/${id}/${saveToDb.slug}`,
        file: saveToDb,
      },
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

export default UploadImageSingle;
