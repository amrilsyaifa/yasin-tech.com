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
exports.getGoogleUser = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const getEnvToVar_1 = __importDefault(require("../helpers/getEnvToVar"));
function getGoogleUser({ access_token, }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, node_fetch_1.default)(`${(0, getEnvToVar_1.default)("GOOGLE_USER_INFO_URL")}?alt=json&access_token=${access_token}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
                .then((response) => response.json())
                .then((response) => response)
                .catch((err) => console.error(err));
            return data;
        }
        catch (err) {
            throw Error(err);
        }
    });
}
exports.getGoogleUser = getGoogleUser;
