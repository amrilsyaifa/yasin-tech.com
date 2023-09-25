"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Login_1 = __importDefault(require("./Login"));
const Register_1 = __importDefault(require("./Register"));
const LoginGoogle_1 = __importDefault(require("./LoginGoogle"));
const Logout_1 = __importDefault(require("./Logout"));
const RefreshToken_1 = __importDefault(require("./RefreshToken"));
const ValidateUserIdTemp_1 = __importDefault(require("./ValidateUserIdTemp"));
const RegisterRemaining_1 = __importDefault(require("./RegisterRemaining"));
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, Login_1.default)(req, res);
        });
    }
    loginGoogle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, LoginGoogle_1.default)(req, res);
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, Register_1.default)(req, res);
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, Logout_1.default)(req, res);
        });
    }
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, RefreshToken_1.default)(req, res);
        });
    }
    validateUserIdTemp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, ValidateUserIdTemp_1.default)(req, res);
        });
    }
    registerRemaining(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, RegisterRemaining_1.default)(req, res);
        });
    }
}
exports.default = new AuthController();
