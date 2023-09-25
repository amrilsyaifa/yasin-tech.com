"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretCryptoAes = exports.saltBcrypt = void 0;
const getEnvToVar_1 = __importDefault(require("../helpers/getEnvToVar"));
exports.saltBcrypt = 12;
exports.secretCryptoAes = (0, getEnvToVar_1.default)("CRYPTO_SECRET");
