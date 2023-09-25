"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("./BaseRouter"));
const RoleController_1 = __importDefault(require("../controllers/RoleController"));
const PrivateRouteMiddleware_1 = __importDefault(require("../middlewares/PrivateRouteMiddleware"));
class RoleRoutes extends BaseRouter_1.default {
    routes() {
        this.router.get("/", PrivateRouteMiddleware_1.default, RoleController_1.default.index);
        this.router.post("/", PrivateRouteMiddleware_1.default, RoleController_1.default.create);
        this.router.get("/:id", PrivateRouteMiddleware_1.default, RoleController_1.default.getById);
        this.router.delete("/:id", PrivateRouteMiddleware_1.default, RoleController_1.default.detele);
    }
}
exports.default = new RoleRoutes().router;
