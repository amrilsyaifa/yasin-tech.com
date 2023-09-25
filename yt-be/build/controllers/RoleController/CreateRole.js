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
const slug_1 = __importDefault(require("slug"));
const RoleModel_1 = __importDefault(require("../../models/RoleModel"));
const Responses_1 = require("../../helpers/Responses");
const RoleValidation_1 = require("../../validations/RoleValidation");
const CreateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const props = req.body;
        const response = RoleValidation_1.RoleSchema.safeParse(props);
        if (!response.success) {
            const { formErrors } = response.error;
            return (0, Responses_1.ErrorResponse)({
                res,
                status: http_status_codes_1.default.INTERNAL_SERVER_ERROR,
                message: "Invalid request",
                data: formErrors.fieldErrors,
            });
        }
        const slugTransform = (0, slug_1.default)(props.title);
        const payload = Object.assign(Object.assign({}, props), { slug: slugTransform });
        const role = yield RoleModel_1.default.create(payload);
        return (0, Responses_1.SuccessResponse)({
            res,
            status: http_status_codes_1.default.ACCEPTED,
            message: "success create role",
            data: role,
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
exports.default = CreateRole;
