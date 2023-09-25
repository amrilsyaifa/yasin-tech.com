import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import { join } from "path";
import { rename, unlink, stat, mkdir } from "fs/promises";

import UploadFileTemp, {
  IUploadFileTemp,
} from "../../models/UploadFileTempModel";
import UploadFile from "../../models/UploadFileModel";
import Post, { IPost, TPost } from "../../models/PostModel";
import { ErrorResponse, SuccessResponse } from "../../helpers/Responses";
import getIDFromToken from "../../helpers/getIDFromToken";
import getEnvToVar from "../../helpers/getEnvToVar";
import { ICreatePost } from "./interface";
import { PostAPISchema } from "../../validations/PostValidation";

const CreatePost = async (req: Request, res: Response): Promise<Response> => {
  try {
    const base_url = getEnvToVar("BASE_URL");
    const base_location = process.env.ROOT_DIR || process.cwd();
    const propsCreate: ICreatePost = req.body;
    const response = PostAPISchema.safeParse(propsCreate);

    if (!response.success) {
      const { formErrors } = response.error;
      return ErrorResponse({
        res,
        status: HttpStatusCodes.BAD_REQUEST,
        message: "Invalid request",
        data: formErrors,
      });
    }

    const tempImages = propsCreate?.temp_images || [];

    let description = propsCreate.description;

    const result = await Promise.all(
      tempImages.map(async (val) => {
        const splitData = val.split("/");
        const id = splitData[splitData.length - 2];
        const img = splitData[splitData.length - 1];
        const hasImage = description.includes(img);
        if (hasImage) {
          // do replace location image
          const oldPath = join(
            base_location,
            `public/uploads/temp/${id}/${img}`
          );

          const newPath = join(base_location, `public/uploads/file/${id}`);

          try {
            await stat(newPath);
          } catch (e: any) {
            if (e.code === "ENOENT") {
              await mkdir(newPath, { recursive: true });
            } else {
              return;
            }
          }

          rename(oldPath, `${newPath}/${img}`);

          description = description.replace(
            `${base_url}/uploads/temp/${id}/${img}`,
            `${base_url}/uploads/file/${id}/${img}`
          );
        }
        if (!hasImage) {
          // do remove location image
          const oldPath = `public/uploads/temp/${id}/${img}`;
          unlink(oldPath);
        }
        return img;
      })
    );

    if (result) {
      const thumbnail = propsCreate.thumbnail?.replace(
        "/uploads/temp/",
        "/uploads/file/"
      );

      const uploadTemp: IUploadFileTemp[] = await UploadFileTemp.find({
        slug: {
          $in: result,
        },
      });

      await UploadFile.insertMany(uploadTemp);
      await UploadFileTemp.deleteMany({
        slug: {
          $in: result,
        },
      });

      const idFromToken = await getIDFromToken(req);

      const payloadPost: TPost = {
        ...propsCreate,
        description,
        author: idFromToken as string,
        thumbnail,
        tags: propsCreate.tag_ids,
      };

      const newPost: IPost = await Post.create(payloadPost);

      return SuccessResponse({
        res,
        status: HttpStatusCodes.ACCEPTED,
        message: "success create post",
        data: newPost,
      });
    }

    return ErrorResponse({
      res,
      status: HttpStatusCodes.BAD_REQUEST,
      message: "bad request",
    });
  } catch (error) {
    console.log("error ", error);
    return ErrorResponse({
      res,
      status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      message: "internal server error",
      data: error,
    });
  }
};

export default CreatePost;
