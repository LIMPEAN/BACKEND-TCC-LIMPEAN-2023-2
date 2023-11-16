"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDataClient = void 0;
const validateRegister_1 = require("../../registerCliente/validate/validateRegister");
const updateDateClientById_1 = require("../../../../model/clienteDAO/updateDateClientById");
function isURL(url) {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(url);
}
const checkDataClient = async function (data, token) {
    let status = true;
    if (data.name === null && data.biography === null && data.idGender === null &&
        data.phones.every(phone => phone.ddd === null && phone.phone === null && phone.newDDD === null && phone.newPhone === null) &&
        data.password === null && data.photoUser === null) {
        status = false;
    }
    if (data.name !== null && (typeof data.name !== "string" || data.name.length < 2)) {
        status = false;
    }
    if (data.idGender !== null && (typeof data.idGender !== "number" || data.idGender > 3 || data.idGender < 1)) {
        status = false;
    }
    if (data.phones.some(phone => typeof phone.phone === "string" || typeof phone.ddd === "string" || typeof phone.newPhone === "string" || typeof phone.newDDD === "string")) {
        if (data.phones.some(phone => !(0, validateRegister_1.validatePhoneWithDDD)(phone.ddd, phone.phone))) {
            status = false;
        }
        if (data.phones.some(phone => !(0, validateRegister_1.validatePhoneWithDDD)(phone.newDDD, phone.newPhone))) {
            status = false;
        }
        for (const phone of data.phones) {
            if (!(await (0, updateDateClientById_1.verifyPhoneClient)(token, phone.ddd, phone.phone, phone.newDDD, phone.newPhone))) {
                status = false;
                break;
            }
        }
    }
    if (data.password !== null && (typeof data.password !== "string" || data.password.length < 6)) {
        status = false;
    }
    if (data.photoUser !== null && !isURL(data.photoUser)) {
        status = false;
    }
    return status;
};
exports.checkDataClient = checkDataClient;
