"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("./BaseRouter"));
const UploadController_1 = __importDefault(require("../controllers/UploadController"));
const PrivateRouteMiddleware_1 = __importDefault(require("../middlewares/PrivateRouteMiddleware"));
class UploadsRoutes extends BaseRouter_1.default {
    routes() {
        this.router.post("/image", PrivateRouteMiddleware_1.default, UploadController_1.default.uploadImageSingle);
    }
}
exports.default = new UploadsRoutes().router;
