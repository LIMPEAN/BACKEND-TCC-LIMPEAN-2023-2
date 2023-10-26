"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDataAddress = void 0;
function isURL(url) {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(url);
}
const checkDataAddress = async function (data, token) {
    let status = true;
    if (data.address.state === null && data.address.city === null && data.address.cep === null &&
        data.address.publicPlace === null && data.address.complement === null && data.address.district === null && data.address.houseNumber === null) {
        status = false;
    }
    if (data.address.state !== null && (typeof data.address.state !== "number" || data.address.state < 1 || data.address.state > 27)) {
        status = false;
    }
    if (data.address.city !== null && (typeof data.address.city !== "string")) {
        status = false;
    }
    if (data.address.cep !== null && (typeof data.address.cep !== "string" || data.address.cep.length > 10)) {
        status = false;
    }
    if (data.address.publicPlace !== null && (typeof data.address.publicPlace !== "string")) {
        status = false;
    }
    if (data.address.complement !== null && (typeof data.address.complement !== "string")) {
        status = false;
    }
    if (data.address.district !== null && (typeof data.address.district !== "string")) {
        status = false;
    }
    if (data.address.houseNumber !== null && (typeof data.address.houseNumber !== "string")) {
        status = false;
    }
    return status;
};
exports.checkDataAddress = checkDataAddress;
