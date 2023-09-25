import { Request, Response } from "express";
import GetAllPost from "./GetAllPost";
import CreatePost from "./CreatePost";
import GetByIdPost from "./GetByIdPost";
import UpdateByIdPost from "./UpdateByIdPost";
import ForShowPost from "./ForShowPost";

interface IPostController {
  getAll(req: Request, res: Response): Response | Promise<Response>;
  create(req: Request, res: Response): Response | Promise<Response>;
  getById(req: Request, res: Response): Response | Promise<Response>;
  update(req: Request, res: Response): Response | Promise<Response>;
  forShow(req: Request, res: Response): Response | Promise<Response>;
}

class PostController implements IPostController {
  async getAll(req: Request, res: Response): Promise<Response> {
    return GetAllPost(req, res);
  }
  async create(req: Request, res: Response): Promise<Response> {
    return CreatePost(req, res);
  }
  async getById(req: Request, res: Response): Promise<Response> {
    return GetByIdPost(req, res);
  }
  async update(req: Request, res: Response): Promise<Response> {
    return UpdateByIdPost(req, res);
  }
  async forShow(req: Request, res: Response): Promise<Response> {
    return ForShowPost(req, res);
  }
}

export default new PostController();
