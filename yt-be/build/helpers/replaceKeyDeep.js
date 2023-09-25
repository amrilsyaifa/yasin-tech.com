"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
function replaceKeysDeep(obj, keysMap) {
    // keysMap = { oldKey1: newKey1, oldKey2: newKey2, etc...
    return lodash_1.default.transform(obj, function (result, value, key) {
        // transform to a new object
        var currentKey = keysMap[key] || key; // if the key is in keysMap use the replacement, if not use the original key
        result[currentKey] = lodash_1.default.isObject(value)
            ? replaceKeysDeep(value, keysMap)
            : value; // if the key is an object run it through the inner function - replaceKeys
    });
}
exports.default = replaceKeysDeep;
