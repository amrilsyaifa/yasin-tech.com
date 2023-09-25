"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("./BaseRouter"));
const PostController_1 = __importDefault(require("../controllers/PostController"));
const PrivateRouteMiddleware_1 = __importDefault(require("../middlewares/PrivateRouteMiddleware"));
class PostRoutes extends BaseRouter_1.default {
    routes() {
        this.router.get("/", PrivateRouteMiddleware_1.default, PostController_1.default.getAll);
        this.router.post("/", PrivateRouteMiddleware_1.default, PostController_1.default.create);
        this.router.get("/:id", PrivateRouteMiddleware_1.default, PostController_1.default.getById);
        this.router.put("/:id", PrivateRouteMiddleware_1.default, PostController_1.default.update);
        this.router.put("/for-show/:id", PrivateRouteMiddleware_1.default, PostController_1.default.forShow);
    }
}
exports.default = new PostRoutes().router;
