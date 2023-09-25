"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("./BaseRouter"));
const TagController_1 = __importDefault(require("../controllers/TagController"));
const PrivateRouteMiddleware_1 = __importDefault(require("../middlewares/PrivateRouteMiddleware"));
class TagRoutes extends BaseRouter_1.default {
    routes() {
        this.router.get("/", PrivateRouteMiddleware_1.default, TagController_1.default.index);
    }
}
exports.default = new TagRoutes().router;
