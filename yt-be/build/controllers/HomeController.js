"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const PostModel_1 = __importDefault(require("../models/PostModel"));
const TestimonyModel_1 = __importDefault(require("../models/TestimonyModel"));
const Responses_1 = require("../helpers/Responses");
class HomeController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const insights = yield PostModel_1.default.find({
                    status: "publish",
                    for_show: true,
                })
                    .populate({
                    path: "author",
                    model: "User",
                    populate: {
                        path: "profile",
                        model: "Profile",
                    },
                })
                    .populate("tags");
                const testimonies = yield TestimonyModel_1.default.find({
                    status: "publish",
                }).populate({
                    path: "author",
                    model: "User",
                    populate: {
                        path: "profile",
                        model: "Profile",
                    },
                });
                return (0, Responses_1.SuccessResponse)({
                    res,
                    status: http_status_codes_1.default.ACCEPTED,
                    message: "success get all data",
                    data: { insights, testimonies },
                });
            }
            catch (error) {
                return (0, Responses_1.ErrorResponse)({
                    res,
                    status: http_status_codes_1.default.INTERNAL_SERVER_ERROR,
                    message: "internal server error",
                    data: error,
                });
            }
        });
    }
    ourEngagement(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const testimonies = yield TestimonyModel_1.default.find({
                    status: "publish",
                }).populate({
                    path: "author",
                    model: "User",
                    populate: {
                        path: "profile",
                        model: "Profile",
                    },
                });
                return (0, Responses_1.SuccessResponse)({
                    res,
                    status: http_status_codes_1.default.ACCEPTED,
                    message: "success get data",
                    data: testimonies,
                });
            }
            catch (error) {
                return (0, Responses_1.ErrorResponse)({
                    res,
                    status: http_status_codes_1.default.INTERNAL_SERVER_ERROR,
                    message: "internal server error",
                    data: error,
                });
            }
        });
    }
}
exports.default = new HomeController();
