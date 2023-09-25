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
const path_1 = require("path");
const promises_1 = require("fs/promises");
const TestimonyModel_1 = __importDefault(require("../../models/TestimonyModel"));
const Responses_1 = require("../../helpers/Responses");
const TestimonyValidation_1 = require("../../validations/TestimonyValidation");
const getIDFromToken_1 = __importDefault(require("../../helpers/getIDFromToken"));
const CreateTestimony = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const base_location = process.env.ROOT_DIR || process.cwd();
        const propsCreate = req.body;
        const response = TestimonyValidation_1.TestimonySchema.safeParse(propsCreate);
        if (!response.success) {
            const { formErrors } = response.error;
            return (0, Responses_1.ErrorResponse)({
                res,
                status: http_status_codes_1.default.BAD_REQUEST,
                message: "Invalid request",
                data: formErrors.fieldErrors,
            });
        }
        let image = propsCreate.image;
        const splitData = propsCreate.image.split("/");
        const id = splitData[splitData.length - 2];
        const img = splitData[splitData.length - 1];
        const oldPath = (0, path_1.join)(base_location, `public/uploads/temp/${id}/${img}`);
        const newPath = (0, path_1.join)(base_location, `public/uploads/file/${id}`);
        try {
            yield (0, promises_1.stat)(newPath);
        }
        catch (e) {
            if (e.code === "ENOENT") {
                yield (0, promises_1.mkdir)(newPath, { recursive: true });
            }
            else {
                return (0, Responses_1.ErrorResponse)({
                    res,
                    status: http_status_codes_1.default.BAD_REQUEST,
                    message: "Invalid request",
                    data: e,
                });
            }
        }
        (0, promises_1.rename)(oldPath, `${newPath}/${img}`);
        image = (_a = propsCreate.image) === null || _a === void 0 ? void 0 : _a.replace("/uploads/temp/", "/uploads/file/");
        const idFromToken = (yield (0, getIDFromToken_1.default)(req));
        const payload = Object.assign(Object.assign({}, propsCreate), { author: idFromToken, image });
        const testimony = yield TestimonyModel_1.default.create(payload);
        return (0, Responses_1.SuccessResponse)({
            res,
            status: http_status_codes_1.default.ACCEPTED,
            message: "success create testimony",
            data: testimony,
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
exports.default = CreateTestimony;
