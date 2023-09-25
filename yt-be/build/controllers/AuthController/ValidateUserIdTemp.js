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
const UserTempModel_1 = __importDefault(require("../../models/UserTempModel"));
const bcrypt_1 = require("../../constant/bcrypt");
const token_1 = require("../../constant/token");
const ValidateUserIdTemp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { method, query } = req;
        const response = AuthValidation_1.ValidateUserTempByIdSchema.safeParse(query);
        if (!response.success) {
            const { formErrors } = response.error;
            return (0, Responses_1.ErrorResponse)({
                res,
                status: http_status_codes_1.default.BAD_REQUEST,
                message: "Invalid request",
                data: formErrors,
            });
        }
        let token;
        if ((_a = req.headers) === null || _a === void 0 ? void 0 : _a[token_1.ytHeader]) {
            token = (_b = req.headers) === null || _b === void 0 ? void 0 : _b[token_1.ytHeader];
        }
        if (!token) {
            return (0, Responses_1.ErrorResponse)({
                res,
                status: http_status_codes_1.default.BAD_REQUEST,
                message: "Invalid request",
            });
        }
        const id = query === null || query === void 0 ? void 0 : query.identify;
        const usr = yield UserTempModel_1.default.findOne({
            _id: id,
        });
        if (!usr) {
            return (0, Responses_1.ErrorResponse)({
                res,
                status: http_status_codes_1.default.BAD_REQUEST,
                message: "Invalid request",
            });
        }
        const bytes = crypto_js_1.default.AES.decrypt(token, bcrypt_1.secretCryptoAes);
        const originalText = bytes.toString(crypto_js_1.default.enc.Utf8);
        if (originalText !== (usr === null || usr === void 0 ? void 0 : usr.id)) {
            return (0, Responses_1.ErrorResponse)({
                res,
                status: http_status_codes_1.default.BAD_REQUEST,
                message: "Invalid request",
            });
        }
        return (0, Responses_1.SuccessResponse)({
            res,
            status: http_status_codes_1.default.ACCEPTED,
            message: "success validate user id",
            data: usr,
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
exports.default = ValidateUserIdTemp;
