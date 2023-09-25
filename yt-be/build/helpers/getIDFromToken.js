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
Object.defineProperty(exports, "__esModule", { value: true });
const tokenHelper_1 = require("./tokenHelper");
const token_1 = require("../constant/token");
const getIDFromToken = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let token;
    if (req.cookies && ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a[token_1.identityToken])) {
        token = req.cookies[token_1.identityToken];
    }
    else if (req.headers.authorization) {
        token = req.headers.authorization.replace("Bearer ", "");
    }
    if (token) {
        const props = yield (0, tokenHelper_1.verifyJWT)(token);
        const { sub } = props;
        return sub;
    }
    else {
        return undefined;
    }
});
exports.default = getIDFromToken;
