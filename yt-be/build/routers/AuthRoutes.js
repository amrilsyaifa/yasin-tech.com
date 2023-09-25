"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("./BaseRouter"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
class AuthRoutes extends BaseRouter_1.default {
    routes() {
        this.router.post("/login", AuthController_1.default.login);
        this.router.post("/login-google", AuthController_1.default.loginGoogle);
        this.router.post("/register", AuthController_1.default.register);
        this.router.get("/logout", AuthController_1.default.logout);
        this.router.post("/refresh-token", AuthController_1.default.refreshToken);
        this.router.get("/validate-userid-temp", AuthController_1.default.validateUserIdTemp);
        this.router.put("/register-remaining/:id", AuthController_1.default.registerRemaining);
    }
}
exports.default = new AuthRoutes().router;
