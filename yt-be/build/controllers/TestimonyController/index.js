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
const GetAllTestimony_1 = __importDefault(require("./GetAllTestimony"));
const CreateTestimony_1 = __importDefault(require("./CreateTestimony"));
const GetByIdTestimony_1 = __importDefault(require("./GetByIdTestimony"));
const UpdateTestimony_1 = __importDefault(require("./UpdateTestimony"));
class TestimonyController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, GetAllTestimony_1.default)(req, res);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, CreateTestimony_1.default)(req, res);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, GetByIdTestimony_1.default)(req, res);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, UpdateTestimony_1.default)(req, res);
        });
    }
}
exports.default = new TestimonyController();
