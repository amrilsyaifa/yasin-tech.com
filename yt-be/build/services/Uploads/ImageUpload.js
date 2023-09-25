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
const mime_1 = __importDefault(require("mime"));
const path_1 = require("path");
// import * as dateFn from 'date-fns';
const formidable_1 = __importDefault(require("formidable"));
const promises_1 = require("fs/promises");
const token_1 = require("../../constant/token");
const tokenHelper_1 = require("../../helpers/tokenHelper");
const ImageUpload = (req) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let token;
        if (req.cookies && ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a[token_1.identityToken]) && !token) {
            token = req.cookies[token_1.identityToken];
        }
        else if (req.headers.authorization) {
            token = req.headers.authorization.replace("Bearer ", "");
        }
        if (!token) {
            return reject({ status: 400, message: "Invalid request" });
        }
        const props = yield (0, tokenHelper_1.verifyJWT)(token);
        const { sub } = props;
        const uploadDir = (0, path_1.join)(process.env.ROOT_DIR || process.cwd(), 
        // `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`
        `public/uploads/temp/${sub}`);
        try {
            yield (0, promises_1.stat)(uploadDir);
        }
        catch (e) {
            if (e.code === "ENOENT") {
                yield (0, promises_1.mkdir)(uploadDir, { recursive: true });
            }
            else {
                reject(e);
                return;
            }
        }
        const form = (0, formidable_1.default)({
            maxFiles: 2,
            maxFileSize: 10000000,
            uploadDir,
            filename: (name, _ext, part) => {
                const newName = (name === null || name === void 0 ? void 0 : name.replace(/ /g, "-")) || "unknown";
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                const filename = `${newName}-${uniqueSuffix}.${(mime_1.default === null || mime_1.default === void 0 ? void 0 : mime_1.default.getExtension(part.mimetype || "")) || "unknown"}`;
                return filename;
            },
            filter: (part) => {
                return part.name === "media";
            },
        });
        form.parse(req, function (err, fields, files) {
            if (err)
                reject(err);
            if (!files.media)
                reject(err);
            else
                resolve({ fields, files, id: sub });
        });
    }));
});
exports.default = ImageUpload;
