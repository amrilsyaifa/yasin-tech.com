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
const Responses_1 = require("../../helpers/Responses");
const PostModel_1 = __importDefault(require("../../models/PostModel"));
const GetPostByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const posts = yield PostModel_1.default.findOne({ slug: id })
            .populate({
            path: "author",
            model: "User",
            populate: {
                path: "profile",
                model: "Profile",
            },
        })
            .populate("tags");
        return (0, Responses_1.SuccessResponse)({
            res,
            status: http_status_codes_1.default.ACCEPTED,
            message: "success get post data",
            data: posts,
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
exports.default = GetPostByID;
