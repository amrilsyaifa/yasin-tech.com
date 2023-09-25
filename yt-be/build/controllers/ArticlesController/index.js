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
const GetPosts_1 = __importDefault(require("./GetPosts"));
const GetPostByID_1 = __importDefault(require("./GetPostByID"));
class ArticlesController {
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, GetPosts_1.default)(req, res);
        });
    }
    getPostId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, GetPostByID_1.default)(req, res);
        });
    }
}
exports.default = new ArticlesController();
