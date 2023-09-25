import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../helpers/Responses";
import getEnvToVar from "../helpers/getEnvToVar";

const SeedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (!req.headers["seed"]) {
    return ErrorResponse({
      res,
      status: 400,
      message: "please provide seed key",
    });
  }

  try {
    let seedKey = getEnvToVar("SEED_SECRET");
    if (seedKey !== req.headers["seed"]) {
      return ErrorResponse({
        res,
        status: 400,
        message: "please provide seed key",
      });
    }

    return next();
  } catch (error) {
    return ErrorResponse({
      res,
      status: 500,
      message: "internal server error",
      data: error,
    });
  }
};

export default SeedMiddleware;
