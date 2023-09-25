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
const lodash_1 = __importDefault(require("lodash"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const Responses_1 = require("../helpers/Responses");
const token_1 = require("../constant/token");
const tokenHelper_1 = require("../helpers/tokenHelper");
class ProfileController {
    myProfile(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let token;
                if (req.cookies && ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a[token_1.identityToken])) {
                    token = req.cookies[token_1.identityToken];
                }
                else if (req.headers.authorization) {
                    token = req.headers.authorization.replace("Bearer ", "");
                }
                if (!token) {
                    return (0, Responses_1.ErrorResponse)({
                        res,
                        status: http_status_codes_1.default.BAD_REQUEST,
                        message: "Invalid request",
                    });
                }
                const props = yield (0, tokenHelper_1.verifyJWT)(token);
                const { sub } = props;
                const myProfile = yield UserModel_1.default.findById(sub)
                    .populate("profile")
                    .populate("role");
                const transformDataProfile = lodash_1.default.mapKeys(myProfile === null || myProfile === void 0 ? void 0 : myProfile.toJSON(), (_, key) => {
                    if (key === "profile_id")
                        return "profile";
                    if (key === "role_id")
                        return "role";
                    return key;
                });
                return (0, Responses_1.SuccessResponse)({
                    res,
                    status: http_status_codes_1.default.ACCEPTED,
                    message: "success get my profile",
                    data: transformDataProfile,
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
exports.default = new ProfileController();
