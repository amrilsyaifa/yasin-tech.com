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
const RoleModel_1 = __importDefault(require("../../models/RoleModel"));
const bcrypt_1 = require("../../constant/bcrypt");
const bcryptjs_1 = require("bcryptjs");
const excludeKey_1 = __importDefault(require("../../helpers/excludeKey"));
const ProfileModel_1 = __importDefault(require("../../models/ProfileModel"));
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = AuthValidation_1.RegisterSchema.safeParse(req.body);
        if (!response.success) {
            const { formErrors } = response.error;
            return (0, Responses_1.ErrorResponse)({
                res,
                status: http_status_codes_1.default.BAD_REQUEST,
                message: "Invalid request",
                data: formErrors.fieldErrors,
            });
        }
        const defaultRole = yield RoleModel_1.default.findOne({ slug: "guest" });
        if (!defaultRole) {
            return (0, Responses_1.ErrorResponse)({
                res,
                status: http_status_codes_1.default.BAD_REQUEST,
                message: "No content of role",
            });
        }
        const hashedpasswordCrypto = crypto_js_1.default.AES.encrypt(response.data.password, bcrypt_1.secretCryptoAes).toString();
        const hashedPasswordBcrypt = yield (0, bcryptjs_1.hash)(response.data.password, bcrypt_1.saltBcrypt);
        const hashedPassword = `${hashedPasswordBcrypt}|-_-|${hashedpasswordCrypto}`;
        // Build user object based on TProfile
        const profileFields = {
            phone_number: response.data.phone_number,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
        };
        const profile = new ProfileModel_1.default(profileFields);
        const userSave = yield profile.save().then((prf) => __awaiter(void 0, void 0, void 0, function* () {
            const prfId = prf._id.toString();
            const userFields = {
                username: response.data.username,
                email: response.data.email,
                password: hashedPassword,
                role: defaultRole._id.toString(),
                profile: prfId,
            };
            const user = new UserModel_1.default(userFields);
            const saveUser = yield user.save();
            const resultProfile = yield profile.save();
            const userJson = saveUser.toJSON();
            const userData = (0, excludeKey_1.default)(userJson, "password");
            return Object.assign(Object.assign({}, userData), { profile: resultProfile });
        }));
        return (0, Responses_1.SuccessResponse)({
            res,
            status: http_status_codes_1.default.CREATED,
            message: "success register",
            data: userSave,
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
exports.default = Register;
