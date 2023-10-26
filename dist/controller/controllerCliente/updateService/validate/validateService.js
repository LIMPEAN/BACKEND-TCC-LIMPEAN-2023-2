"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateHour = exports.validateDate = exports.validateValueMonetary = exports.validateTypesJson = void 0;
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
function validateHour(hour) {
    const regexHora = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    if (regexHora.test(hour)) {
        return true;
    }
    else {
        return false;
    }
}
exports.validateHour = validateHour;
const validateDate = (date) => {
    let status = true;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const dateRegexBar = /^\d{4}\/\d{2}\/\d{2}$/;
    if (!date.match(dateRegex) && !date.match(dateRegexBar)) {
        return false;
    }
    return status;
};
exports.validateDate = validateDate;
