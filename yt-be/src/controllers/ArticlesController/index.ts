import { Request, Response } from "express";
import GetPosts from "./GetPosts";
import GetPostByID from "./GetPostByID";

interface IArticlesController {
  getPosts(req: Request, res: Response): Response | Promise<Response>;
  getPostId(req: Request, res: Response): Response | Promise<Response>;
}

class ArticlesController implements IArticlesController {
  async getPosts(req: Request, res: Response): Promise<Response> {
    return GetPosts(req, res);
  }
  async getPostId(req: Request, res: Response): Promise<Response> {
    return GetPostByID(req, res);
  }
}

export default new ArticlesController();
