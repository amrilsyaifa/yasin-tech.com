"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Responses_1 = require("../helpers/Responses");
const PrivateRoute = (req, res, next) => {
    if (!req.headers.authorization) {
        return (0, Responses_1.ErrorResponse)({
            res,
            status: 401,
            message: "please provide token",
        });
    }
    let secretKey = process.env.JWT_SECRET_KEY || "secret";
    const token = req.headers.authorization.split(" ")[1];
    try {
        const credential = jsonwebtoken_1.default.verify(token, secretKey);
        if (credential) {
            req.app.locals.credential = credential;
            return next();
        }
        return (0, Responses_1.ErrorResponse)({
            res,
            status: 401,
            message: "token invalid",
        });
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return (0, Responses_1.ErrorResponse)({
                res,
                status: 401,
                message: error.message,
            });
        }
        if (error.name === "JsonWebTokenError") {
            return (0, Responses_1.ErrorResponse)({
                res,
                status: 401,
                message: error.message,
            });
        }
        return (0, Responses_1.ErrorResponse)({
            res,
            status: 500,
            message: "internal server error",
            data: error,
        });
    }
};
exports.default = PrivateRoute;
