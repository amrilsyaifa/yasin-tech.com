"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = exports.SuccessResponse = void 0;
const SuccessResponse = (props) => {
    var _a;
    return props.res.status(props.status).json({
        status: "success",
        message: props.message,
        data: (_a = props === null || props === void 0 ? void 0 : props.data) !== null && _a !== void 0 ? _a : null,
    });
};
exports.SuccessResponse = SuccessResponse;
const ErrorResponse = (props) => {
    var _a;
    return props.res.status(props.status).json({
        status: "error",
        message: props.message,
        data: (_a = props === null || props === void 0 ? void 0 : props.data) !== null && _a !== void 0 ? _a : null,
    });
};
exports.ErrorResponse = ErrorResponse;
