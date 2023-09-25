"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("./BaseRouter"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
class UserRoutes extends BaseRouter_1.default {
    routes() {
        this.router.get("/", UserController_1.default.index);
        // this.router.post("/", UserController.create);
        // this.router.get("/", PrivateRoute, UserController.index);
        // this.router.post("/", UserController.create);
        // this.router.get("/:id", UserController.show);
        // this.router.put("/:id", UserController.update);
        // this.router.delete("/:id", UserController.delete);
    }
}
exports.default = new UserRoutes().router;
