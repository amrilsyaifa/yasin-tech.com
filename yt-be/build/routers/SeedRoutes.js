"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("./BaseRouter"));
const SeedMiddleware_1 = __importDefault(require("../middlewares/SeedMiddleware"));
const SeedController_1 = __importDefault(require("../controllers/SeedController"));
class SeedRoutes extends BaseRouter_1.default {
    routes() {
        this.router.post("/roles", SeedMiddleware_1.default, SeedController_1.default.roles);
        this.router.post("/tags", SeedMiddleware_1.default, SeedController_1.default.tags);
    }
}
exports.default = new SeedRoutes().router;
