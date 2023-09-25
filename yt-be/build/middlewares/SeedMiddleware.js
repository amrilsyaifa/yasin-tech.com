"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Responses_1 = require("../helpers/Responses");
const getEnvToVar_1 = __importDefault(require("../helpers/getEnvToVar"));
const SeedMiddleware = (req, res, next) => {
    if (!req.headers["seed"]) {
        return (0, Responses_1.ErrorResponse)({
            res,
            status: 400,
            message: "please provide seed key",
        });
    }
    try {
        let seedKey = (0, getEnvToVar_1.default)("SEED_SECRET");
        if (seedKey !== req.headers["seed"]) {
            return (0, Responses_1.ErrorResponse)({
                res,
                status: 400,
                message: "please provide seed key",
            });
        }
        return next();
    }
    catch (error) {
        return (0, Responses_1.ErrorResponse)({
            res,
            status: 500,
            message: "internal server error",
            data: error,
        });
    }
};
exports.default = SeedMiddleware;
