import { Request, Response } from "express";
import GetAllRole from "./GetAllRole";
import CreateRole from "./CreateRole";
import GetByIdRole from "./GetByIdRole";
import DeleteRole from "./DeleteRole";

interface IRoleController {
  index(req: Request, res: Response): Response | Promise<Response>;
  create(req: Request, res: Response): Response | Promise<Response>;
  getById(req: Request, res: Response): Response | Promise<Response>;
  detele(req: Request, res: Response): Response | Promise<Response>;
}

class RoleController implements IRoleController {
  async index(req: Request, res: Response): Promise<Response> {
    return GetAllRole(req, res);
  }
  async create(req: Request, res: Response): Promise<Response> {
    return CreateRole(req, res);
  }
  async getById(req: Request, res: Response): Promise<Response> {
    return GetByIdRole(req, res);
  }
  async detele(req: Request, res: Response): Promise<Response> {
    return DeleteRole(req, res);
  }
}

export default new RoleController();
