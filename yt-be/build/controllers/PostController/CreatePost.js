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
const UploadFileTempModel_1 = __importDefault(require("../../models/UploadFileTempModel"));
const UploadFileModel_1 = __importDefault(require("../../models/UploadFileModel"));
const PostModel_1 = __importDefault(require("../../models/PostModel"));
const Responses_1 = require("../../helpers/Responses");
const getIDFromToken_1 = __importDefault(require("../../helpers/getIDFromToken"));
const getEnvToVar_1 = __importDefault(require("../../helpers/getEnvToVar"));
const PostValidation_1 = require("../../validations/PostValidation");
const CreatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const base_url = (0, getEnvToVar_1.default)("BASE_URL");
        const base_location = process.env.ROOT_DIR || process.cwd();
        const propsCreate = req.body;
        const response = PostValidation_1.PostAPISchema.safeParse(propsCreate);
        if (!response.success) {
            const { formErrors } = response.error;
            return (0, Responses_1.ErrorResponse)({
                res,
                status: http_status_codes_1.default.BAD_REQUEST,
                message: "Invalid request",
                data: formErrors,
            });
        }
        const tempImages = (propsCreate === null || propsCreate === void 0 ? void 0 : propsCreate.temp_images) || [];
        let description = propsCreate.description;
        const result = yield Promise.all(tempImages.map((val) => __awaiter(void 0, void 0, void 0, function* () {
            const splitData = val.split("/");
            const id = splitData[splitData.length - 2];
            const img = splitData[splitData.length - 1];
            const hasImage = description.includes(img);
            if (hasImage) {
                // do replace location image
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
                        return;
                    }
                }
                (0, promises_1.rename)(oldPath, `${newPath}/${img}`);
                description = description.replace(`${base_url}/uploads/temp/${id}/${img}`, `${base_url}/uploads/file/${id}/${img}`);
            }
            if (!hasImage) {
                // do remove location image
                const oldPath = `public/uploads/temp/${id}/${img}`;
                (0, promises_1.unlink)(oldPath);
            }
            return img;
        })));
        if (result) {
            const thumbnail = (_a = propsCreate.thumbnail) === null || _a === void 0 ? void 0 : _a.replace("/uploads/temp/", "/uploads/file/");
            const uploadTemp = yield UploadFileTempModel_1.default.find({
                slug: {
                    $in: result,
                },
            });
            yield UploadFileModel_1.default.insertMany(uploadTemp);
            yield UploadFileTempModel_1.default.deleteMany({
                slug: {
                    $in: result,
                },
            });
            const idFromToken = yield (0, getIDFromToken_1.default)(req);
            const payloadPost = Object.assign(Object.assign({}, propsCreate), { description, author: idFromToken, thumbnail, tags: propsCreate.tag_ids });
            const newPost = yield PostModel_1.default.create(payloadPost);
            return (0, Responses_1.SuccessResponse)({
                res,
                status: http_status_codes_1.default.ACCEPTED,
                message: "success create post",
                data: newPost,
            });
        }
        return (0, Responses_1.ErrorResponse)({
            res,
            status: http_status_codes_1.default.BAD_REQUEST,
            message: "bad request",
        });
    }
    catch (error) {
        console.log("error ", error);
        return (0, Responses_1.ErrorResponse)({
            res,
            status: http_status_codes_1.default.INTERNAL_SERVER_ERROR,
            message: "internal server error",
            data: error,
        });
    }
});
exports.default = CreatePost;
