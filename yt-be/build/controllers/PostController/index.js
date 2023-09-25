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
const GetAllPost_1 = __importDefault(require("./GetAllPost"));
const CreatePost_1 = __importDefault(require("./CreatePost"));
const GetByIdPost_1 = __importDefault(require("./GetByIdPost"));
const UpdateByIdPost_1 = __importDefault(require("./UpdateByIdPost"));
const ForShowPost_1 = __importDefault(require("./ForShowPost"));
class PostController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, GetAllPost_1.default)(req, res);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, CreatePost_1.default)(req, res);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, GetByIdPost_1.default)(req, res);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, UpdateByIdPost_1.default)(req, res);
        });
    }
    forShow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, ForShowPost_1.default)(req, res);
        });
    }
}
exports.default = new PostController();
