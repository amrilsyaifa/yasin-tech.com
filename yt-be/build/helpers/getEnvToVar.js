"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getEnvToVar(key) {
    const value = process.env[key];
    if (!value || value.length === 0) {
        throw new Error(`The environment variable ${key} is not set.`);
    }
    return value;
}
exports.default = getEnvToVar;
