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
const Responses_1 = require("../helpers/Responses");
const RoleModel_1 = __importDefault(require("../models/RoleModel"));
const TagModel_1 = __importDefault(require("../models/TagModel"));
const SeedValidation_1 = require("../validations/SeedValidation");
class SeedController {
    roles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = SeedValidation_1.RolesSchema.safeParse(req.body);
                if (!response.success) {
                    const { formErrors } = response.error;
                    return (0, Responses_1.ErrorResponse)({
                        res,
                        status: http_status_codes_1.default.BAD_REQUEST,
                        message: "Invalid request",
                        data: formErrors.fieldErrors,
                    });
                }
                const roleParams = response.data.roles;
                const roles = yield RoleModel_1.default.insertMany(roleParams);
                return (0, Responses_1.SuccessResponse)({
                    res,
                    status: http_status_codes_1.default.CREATED,
                    message: "success insert seed roles",
                    data: roles,
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
    tags(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = SeedValidation_1.TagsSchema.safeParse(req.body);
                if (!response.success) {
                    const { formErrors } = response.error;
                    return (0, Responses_1.ErrorResponse)({
                        res,
                        status: http_status_codes_1.default.BAD_REQUEST,
                        message: "Invalid request",
                        data: formErrors.fieldErrors,
                    });
                }
                const tagsParam = response.data.tags;
                const tags = yield TagModel_1.default.insertMany(tagsParam);
                return (0, Responses_1.SuccessResponse)({
                    res,
                    status: http_status_codes_1.default.CREATED,
                    message: "success insert seed tags",
                    data: tags,
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
exports.default = new SeedController();
