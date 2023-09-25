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
exports.processNewToken = exports.verifyJWT = exports.signJWT = void 0;
const snakecase_keys_1 = __importDefault(require("snakecase-keys"));
const getEnvToVar_1 = __importDefault(require("./getEnvToVar"));
const jose_1 = require("jose");
const signJWT = (payload, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const secret = new TextEncoder().encode((0, getEnvToVar_1.default)("JWT_SECRET_KEY"));
        const alg = "HS256";
        return new jose_1.SignJWT(payload)
            .setProtectedHeader({ alg })
            .setExpirationTime(options.exp)
            .setIssuedAt()
            .setSubject(payload.sub)
            .sign(secret);
    }
    catch (error) {
        throw error;
    }
});
exports.signJWT = signJWT;
const verifyJWT = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (yield (0, jose_1.jwtVerify)(token, new TextEncoder().encode((0, getEnvToVar_1.default)("JWT_SECRET_KEY")))).payload;
    }
    catch (error) {
        throw new Error("Your token has expired.");
    }
});
exports.verifyJWT = verifyJWT;
const processNewToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const JWT_EXPIRES_IN = (0, getEnvToVar_1.default)("JWT_EXPIRES_IN");
    const JWT_REFRESH_EXPIRES_IN = (0, getEnvToVar_1.default)("JWT_REFRESH_EXPIRES_IN");
    const token = yield (0, exports.signJWT)({ sub: id }, { exp: `${JWT_EXPIRES_IN}m` });
    const refreshToken = yield (0, exports.signJWT)((0, snakecase_keys_1.default)({ sub: id, isRefreshToken: true }), { exp: `${JWT_REFRESH_EXPIRES_IN}d` });
    const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60;
    const refreshTokenMaxAge = parseInt(JWT_REFRESH_EXPIRES_IN) * 24 * 60 * 60 * 1000;
    const cookie = {
        token,
        refreshToken,
        maxAge: tokenMaxAge,
        maxAgeRefresh: refreshTokenMaxAge,
    };
    return cookie;
});
exports.processNewToken = processNewToken;
