"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("./BaseRouter"));
const ProfileController_1 = __importDefault(require("../controllers/ProfileController"));
const PrivateRouteMiddleware_1 = __importDefault(require("../middlewares/PrivateRouteMiddleware"));
class ProfileRoutes extends BaseRouter_1.default {
    routes() {
        this.router.get("/my-profile", PrivateRouteMiddleware_1.default, ProfileController_1.default.myProfile);
    }
}
exports.default = new ProfileRoutes().router;
