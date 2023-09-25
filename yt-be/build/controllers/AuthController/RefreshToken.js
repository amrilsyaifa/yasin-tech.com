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
const token_1 = require("../../constant/token");
const tokenHelper_1 = require("../../helpers/tokenHelper");
const getEnvToVar_1 = __importDefault(require("../../helpers/getEnvToVar"));
const RefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let token;
        if (req.cookies && ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a[token_1.identityRefreshToken])) {
            token = req.cookies[token_1.identityRefreshToken];
        }
        else if (req.headers.authorization) {
            token = req.headers.authorization.replace("Bearer ", "");
        }
        if (req.cookies && ((_b = req.cookies) === null || _b === void 0 ? void 0 : _b[token_1.identityToken]) && !token) {
            token = req.cookies[token_1.identityToken];
        }
        if (!token) {
            return (0, Responses_1.ErrorResponse)({
                res,
                status: http_status_codes_1.default.BAD_REQUEST,
                message: "Invalid request",
            });
        }
        const props = yield (0, tokenHelper_1.verifyJWT)(token);
        const { sub, is_refresh_token } = props;
        if (!is_refresh_token) {
            return (0, Responses_1.SuccessResponse)({
                res,
                status: http_status_codes_1.default.UNAUTHORIZED,
                message: "Refresh token is invalid",
            });
        }
        const cookieOptions = yield (0, tokenHelper_1.processNewToken)(sub);
        res.cookie(token_1.identityToken, cookieOptions.token, {
            maxAge: cookieOptions.maxAge,
            secure: (0, getEnvToVar_1.default)("NODE_ENV") !== "development",
            path: "/",
            httpOnly: true,
        });
        res.cookie(token_1.identityRefreshToken, cookieOptions.refreshToken, {
            maxAge: cookieOptions.maxAgeRefresh,
            secure: (0, getEnvToVar_1.default)("NODE_ENV") !== "development",
            path: "/",
            httpOnly: true,
        });
        return (0, Responses_1.SuccessResponse)({
            res,
            status: http_status_codes_1.default.ACCEPTED,
            message: "success login",
            data: {
                token: cookieOptions.token,
                refresh_token: cookieOptions.refreshToken,
            },
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
exports.default = RefreshToken;
