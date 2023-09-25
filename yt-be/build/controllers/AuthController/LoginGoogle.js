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
const AuthValidation_1 = require("../../validations/AuthValidation");
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const UserTempModel_1 = __importDefault(require("../../models/UserTempModel"));
const tokenHelper_1 = require("../../helpers/tokenHelper");
const token_1 = require("../../constant/token");
const getEnvToVar_1 = __importDefault(require("../../helpers/getEnvToVar"));
const session_1 = require("../../services/session");
const LoginGoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = AuthValidation_1.LoginGoogleSchema.safeParse(req.body);
        if (!response.success) {
            const { formErrors } = response.error;
            return (0, Responses_1.ErrorResponse)({
                res,
                status: http_status_codes_1.default.BAD_REQUEST,
                message: "Invalid request",
                data: formErrors,
            });
        }
        const { given_name, family_name, email, picture } = yield (0, session_1.getGoogleUser)({
            access_token: req.body.access_token,
        });
        const userTemp = yield UserTempModel_1.default.findOne({
            email,
        });
        let userId = "";
        let userTempId = "";
        let returnData = null;
        if (userTemp) {
            if (!userTemp.phone_number && !userTemp.username) {
                returnData = {
                    is_success: true,
                    is_user_exist: true,
                    go_to: "register_remaining_data",
                };
            }
            if (userTemp.phone_number && userTemp.username) {
                returnData = {
                    is_success: true,
                    is_user_exist: true,
                    go_to: "on_completed",
                };
            }
            userTempId = userTemp.id;
        }
        if (!userTemp) {
            const user = yield UserModel_1.default.findOne({
                email,
            });
            if (user) {
                userId = user.id;
                returnData = {
                    is_success: true,
                    is_user_exist: true,
                    go_to: "on_completed",
                };
            }
            if (!user) {
                userId = "";
                returnData = {
                    is_success: true,
                    is_user_exist: false,
                    go_to: "register_remaining_data",
                };
            }
        }
        if (!(returnData === null || returnData === void 0 ? void 0 : returnData.is_user_exist) &&
            (returnData === null || returnData === void 0 ? void 0 : returnData.go_to) === "register_remaining_data") {
            const usrCreate = yield UserTempModel_1.default.create({
                email: email,
                first_name: given_name,
                last_name: family_name,
                image: picture,
            });
            userTempId = usrCreate.id;
        }
        if ((returnData === null || returnData === void 0 ? void 0 : returnData.is_user_exist) &&
            (returnData === null || returnData === void 0 ? void 0 : returnData.go_to) === "register_remaining_data") {
            yield UserTempModel_1.default.updateOne({
                email,
            }, {
                email: email,
                first_name: given_name,
                last_name: family_name,
                image: picture,
            });
        }
        if ((returnData === null || returnData === void 0 ? void 0 : returnData.is_success) &&
            (returnData === null || returnData === void 0 ? void 0 : returnData.is_user_exist) &&
            (returnData === null || returnData === void 0 ? void 0 : returnData.go_to) === "on_completed") {
            const cookieOptions = yield (0, tokenHelper_1.processNewToken)(userId);
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
            returnData = Object.assign(Object.assign({}, returnData), { cookie_data: cookieOptions });
        }
        return (0, Responses_1.SuccessResponse)({
            res,
            status: http_status_codes_1.default.ACCEPTED,
            message: "success login with google",
            data: Object.assign(Object.assign({}, returnData), { user_id: userTempId }),
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
exports.default = LoginGoogle;
