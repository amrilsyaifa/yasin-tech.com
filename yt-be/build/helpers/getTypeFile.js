"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTypeFile = (mimeType) => {
    if (mimeType.includes('image'))
        return 'image';
    if (mimeType.includes('application'))
        return 'doc';
    return 'file';
};
exports.default = getTypeFile;
