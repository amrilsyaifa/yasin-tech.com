import { Request, Response } from "express";
import UploadImageSingle from "./UploadImageSingle";

interface IUploadController {
  uploadImageSingle(req: Request, res: Response): Response | Promise<Response>;
}

class UploadController implements IUploadController {
  async uploadImageSingle(req: Request, res: Response): Promise<Response> {
    return UploadImageSingle(req, res);
  }
}

export default new UploadController();
