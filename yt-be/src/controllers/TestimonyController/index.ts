import { Request, Response } from "express";
import GetAllTestimony from "./GetAllTestimony";
import CreateTestimony from "./CreateTestimony";
import GetByIdTestimony from "./GetByIdTestimony";
import UpdateTestimony from "./UpdateTestimony";

interface ITestimonyController {
  index(req: Request, res: Response): Response | Promise<Response>;
  create(req: Request, res: Response): Response | Promise<Response>;
  getById(req: Request, res: Response): Response | Promise<Response>;
  update(req: Request, res: Response): Response | Promise<Response>;
}

class TestimonyController implements ITestimonyController {
  async index(req: Request, res: Response): Promise<Response> {
    return GetAllTestimony(req, res);
  }
  async create(req: Request, res: Response): Promise<Response> {
    return CreateTestimony(req, res);
  }
  async getById(req: Request, res: Response): Promise<Response> {
    return GetByIdTestimony(req, res);
  }
  async update(req: Request, res: Response): Promise<Response> {
    return UpdateTestimony(req, res);
  }
}

export default new TestimonyController();
