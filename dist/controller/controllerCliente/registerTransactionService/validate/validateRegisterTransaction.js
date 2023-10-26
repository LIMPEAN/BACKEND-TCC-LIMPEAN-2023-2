"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTypesJson = void 0;
const validateTypesJson = (data) => {
    let statusValidate = true;
    if (typeof data.serviceId !== "number" ||
        typeof data.value !== "string" ||
        typeof data.receipt !== "string" ||
        typeof data.typeTransactionId !== "number") {
        statusValidate = false;
    }
    return statusValidate;
};
exports.validateTypesJson = validateTypesJson;
