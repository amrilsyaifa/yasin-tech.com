"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function exclude(obj, keyAttr) {
    for (const prop in obj) {
        if (prop === keyAttr)
            delete obj[prop];
        else if (typeof obj[prop] === 'object')
            exclude(obj[prop], keyAttr);
    }
    return obj;
}
exports.default = exclude;
