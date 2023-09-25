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
const crypto_js_1 = __importDefault(require("crypto-js"));
const Responses_1 = require("../../helpers/Responses");
const AuthValidation_1 = require("../../validations/AuthValidation");
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const tokenHelper_1 = require("../../helpers/tokenHelper");
const token_1 = require("../../constant/token");
const getEnvToVar_1 = __importDefault(require("../../helpers/getEnvToVar"));
const bcrypt_1 = require("../../constant/bcrypt");
const bcryptjs_1 = require("bcryptjs");
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = AuthValidation_1.LoginSchema.safeParse(req.body);
        if (!response.success) {
            const { formErrors } = response.error;
            return (0, Responses_1.ErrorResponse)({
                res,
                status: http_status_codes_1.default.BAD_REQUEST,
                message: "Invalid request",
                data: formErrors,
            });
        }
        const user = yield UserModel_1.default.findOne({
            $or: [
                { username: response.data.username },
                { email: response.data.username },
            ],
        });
        if (!user) {
            return (0, Responses_1.ErrorResponse)({
                res,
                status: http_status_codes_1.default.BAD_REQUEST,
                message: "Invalid email or password",
            });
        }
        const userJson = user.toJSON();
        const splitPassword = userJson.password.split("|-_-|");
        const bytes = crypto_js_1.default.AES.decrypt(splitPassword[1], bcrypt_1.secretCryptoAes);
        const originalText = bytes.toString(crypto_js_1.default.enc.Utf8);
        const isCorrectBcrypt = yield (0, bcryptjs_1.compare)(response.data.password, splitPassword[0]);
        const isCorrectCrypto = originalText === response.data.password;
        if (!(isCorrectBcrypt && isCorrectCrypto)) {
            return (0, Responses_1.ErrorResponse)({
                res,
                status: http_status_codes_1.default.BAD_REQUEST,
                message: "Invalid email or password",
            });
        }
        const cookieOptions = yield (0, tokenHelper_1.processNewToken)(user.id);
        res.cookie(token_1.identityToken, cookieOptions.token, {
            maxAge: cookieOptions.maxAge,
            secure: (0, getEnvToVar_1.default)("NODE_ENV") !== "development",
            path: "/",
            httpOnly: true,
            sameSite: "none",
        });
        res.cookie(token_1.identityRefreshToken, cookieOptions.refreshToken, {
            maxAge: cookieOptions.maxAgeRefresh,
            secure: (0, getEnvToVar_1.default)("NODE_ENV") !== "development",
            path: "/",
            httpOnly: true,
            sameSite: "none",
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
exports.default = Login;
