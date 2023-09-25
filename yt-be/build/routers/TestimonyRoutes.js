"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("./BaseRouter"));
const TestimonyController_1 = __importDefault(require("../controllers/TestimonyController"));
const PrivateRouteMiddleware_1 = __importDefault(require("../middlewares/PrivateRouteMiddleware"));
class TestimonyRoutes extends BaseRouter_1.default {
    routes() {
        this.router.get("/", PrivateRouteMiddleware_1.default, TestimonyController_1.default.index);
        this.router.post("/", PrivateRouteMiddleware_1.default, TestimonyController_1.default.create);
        this.router.get("/:id", PrivateRouteMiddleware_1.default, TestimonyController_1.default.getById);
        this.router.put("/:id", PrivateRouteMiddleware_1.default, TestimonyController_1.default.update);
    }
}
exports.default = new TestimonyRoutes().router;
