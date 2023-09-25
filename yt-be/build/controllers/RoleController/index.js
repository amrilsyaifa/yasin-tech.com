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
const GetAllRole_1 = __importDefault(require("./GetAllRole"));
const CreateRole_1 = __importDefault(require("./CreateRole"));
const GetByIdRole_1 = __importDefault(require("./GetByIdRole"));
const DeleteRole_1 = __importDefault(require("./DeleteRole"));
class RoleController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, GetAllRole_1.default)(req, res);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, CreateRole_1.default)(req, res);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, GetByIdRole_1.default)(req, res);
        });
    }
    detele(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, DeleteRole_1.default)(req, res);
        });
    }
}
exports.default = new RoleController();
