"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("./BaseRouter"));
const ArticlesController_1 = __importDefault(require("../controllers/ArticlesController"));
class ArticlesRoutes extends BaseRouter_1.default {
    routes() {
        this.router.get("/posts", ArticlesController_1.default.getPosts);
        this.router.get("/posts/:id", ArticlesController_1.default.getPostId);
    }
}
exports.default = new ArticlesRoutes().router;
