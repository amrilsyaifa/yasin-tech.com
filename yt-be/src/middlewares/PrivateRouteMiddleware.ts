import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ErrorResponse } from "../helpers/Responses";

const PrivateRoute = (req: Request, res: Response, next: NextFunction): any => {
  if (!req.headers.authorization) {
    return ErrorResponse({
      res,
      status: 401,
      message: "please provide token",
    });
  }

  let secretKey = process.env.JWT_SECRET_KEY || "secret";
  const token: string = req.headers.authorization.split(" ")[1];

  try {
    const credential: string | object = jwt.verify(token, secretKey);

    if (credential) {
      req.app.locals.credential = credential;
      return next();
    }

    return ErrorResponse({
      res,
      status: 401,
      message: "token invalid",
    });
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return ErrorResponse({
        res,
        status: 401,
        message: error.message,
      });
    }
    if (error.name === "JsonWebTokenError") {
      return ErrorResponse({
        res,
        status: 401,
        message: error.message,
      });
    }
    return ErrorResponse({
      res,
      status: 500,
      message: "internal server error",
      data: error,
    });
  }
};

export default PrivateRoute;
