"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateValueMonetary = exports.validateDate = exports.validateHour = exports.validateIdTypeCleaning = exports.validateDataService = void 0;
const validateDataService = (data) => {
    let status = true;
    if (typeof data.addressId !== 'number' ||
        (typeof data.diaristId !== 'number' &&
            data.diaristId !== null) ||
        typeof data.bedroom !== 'number' ||
        typeof data.livingRoom !== 'number' ||
        typeof data.kitchen !== 'number' ||
        typeof data.bathroom !== 'number' ||
        typeof data.office !== 'number' ||
        typeof data.laundry !== 'number' ||
        typeof data.garage !== 'number' ||
        typeof data.yard !== 'number' ||
        typeof data.recreationArea !== 'number' ||
        typeof data.typeCleaningId !== 'number' ||
        typeof data.hasChildren !== 'boolean' ||
        typeof data.hasPet !== 'boolean' ||
        (typeof data.observation !== "string" && data.observation !== null) ||
        (typeof data.additionalTasks !== "string" && data.additionalTasks !== null) ||
        typeof data.date !== 'string' ||
        typeof data.startHour !== 'string' ||
        (typeof data.value !== 'string' && data.value !== null)) {
        status = false;
    }
    return status;
};
exports.validateDataService = validateDataService;
const validateIdTypeCleaning = (data) => {
    let statusId = true;
    if (data.typeCleaningId < 0 || data.typeCleaningId > 5) {
        statusId = false;
    }
    return statusId;
};
exports.validateIdTypeCleaning = validateIdTypeCleaning;
function validateHour(data) {
    const regexHora = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    if (regexHora.test(data.startHour)) {
        return true;
    }
    else {
        return false;
    }
}
exports.validateHour = validateHour;
const validateDate = (data) => {
    let status = true;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const dateRegexBar = /^\d{4}\/\d{2}\/\d{2}$/;
    if (!data.date.match(dateRegex) && !data.date.match(dateRegexBar)) {
        return false;
    }
    return status;
};
exports.validateDate = validateDate;
const validateValueMonetary = (data) => {
    const regexValor = /^(\d{1,3}(,\d{3})*(\.\d{2})?|\d{1,3}(\.\d{3})*(,\d{2})?)$/;
    if (regexValor.test(data.value)) {
        const valorNumerico = parseFloat(data.value.replace(/,/g, '').replace(/\./, ''));
        if (valorNumerico > -1) {
            return true;
        }
    }
    return false;
};
exports.validateValueMonetary = validateValueMonetary;
