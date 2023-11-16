"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateValueMonetary = exports.validateTypesJson = void 0;
const validateTypesJson = (data) => {
    let status = true;
    if (typeof data.idService !== "number" || typeof data.newValue !== "string") {
        status = false;
    }
    return status;
};
exports.validateTypesJson = validateTypesJson;
const validateValueMonetary = (value) => {
    const regexValor = /^(\d{1,3}(,\d{3})*(\.\d{2})?|\d{1,3}(\.\d{3})*(,\d{2})?)$/;
    if (regexValor.test(value)) {
        const valorNumerico = parseFloat(value.replace(/,/g, '').replace(/\./, ''));
        if (valorNumerico > -1) {
            return true;
        }
    }
    return false;
};
exports.validateValueMonetary = validateValueMonetary;
