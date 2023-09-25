"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("./BaseRouter"));
const HomeController_1 = __importDefault(require("../controllers/HomeController"));
class HomeRoutes extends BaseRouter_1.default {
    routes() {
        this.router.get("/", HomeController_1.default.index);
        this.router.get("/our-enggagement", HomeController_1.default.ourEngagement);
    }
}
exports.default = new HomeRoutes().router;
