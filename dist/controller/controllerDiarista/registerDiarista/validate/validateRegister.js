"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateValueMonetary = exports.validateTypesJson = exports.validadeAddress = exports.validatePhoneWithDDD = exports.validateDateBirth = exports.validateCPF = exports.validateEmail = void 0;
function validateTypesJson(json) {
    try {
        const diarista = json;
        if (typeof diarista.email !== 'string' ||
            typeof diarista.password !== 'string' ||
            typeof diarista.nameUser !== 'string' ||
            typeof diarista.photoUser !== 'string' ||
            typeof diarista.phone !== 'string' ||
            typeof diarista.ddd !== 'string' ||
            typeof diarista.birthDate !== 'string' ||
            typeof diarista.idGender !== 'number' ||
            typeof diarista.cpf !== 'string' ||
            (typeof diarista.biography !== 'string' &&
                diarista.biography !== null) ||
            typeof diarista.averagePrice !== 'string' &&
                diarista.averagePrice !== null ||
            typeof diarista.address !== 'object' ||
            typeof diarista.address.state !== 'number' ||
            typeof diarista.address.city !== 'string' ||
            typeof diarista.address.cep !== 'string' ||
            (typeof diarista.address.publicPlace !== 'string' &&
                diarista.address.publicPlace !== null) ||
            typeof diarista.address.district !== 'string' ||
            (typeof diarista.address.complement !== 'string' &&
                diarista.address.complement !== null) ||
            typeof diarista.address.houseNumber !== 'string') {
            return false;
        }
        return true;
    }
    catch (error) {
        return false;
    }
}
exports.validateTypesJson = validateTypesJson;
function validatePhoneWithDDD(ddd, phone) {
    if (typeof ddd !== "string" || typeof phone !== "string") {
        return false;
    }
    let numberPhone = `${ddd} ${phone}`;
    let telefone = numberPhone.replace(/\D/g, '');
    if (!(telefone.length >= 10 && telefone.length <= 11))
        return false;
    if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9)
        return false;
    for (var n = 0; n < 10; n++) {
        if (telefone == new Array(11).join() || telefone == new Array(12).join())
            return false;
    }
    var codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
        21, 22, 24, 27, 28, 31, 32, 33, 34,
        35, 37, 38, 41, 42, 43, 44, 45, 46,
        47, 48, 49, 51, 53, 54, 55, 61, 62,
        64, 63, 65, 66, 67, 68, 69, 71, 73,
        74, 75, 77, 79, 81, 82, 83, 84, 85,
        86, 87, 88, 89, 91, 92, 93, 94, 95,
        96, 97, 98, 99];
    if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1)
        return false;
    if (telefone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1)
        return false;
    return true;
}
exports.validatePhoneWithDDD = validatePhoneWithDDD;
function validateEmail(email) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
exports.validateEmail = validateEmail;
function validateDateBirth(dataNascimento) {
    let status = true;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const dateRegexBar = /^\d{4}\/\d{2}\/\d{2}$/;
    if (!dataNascimento.match(dateRegex) && !dataNascimento.match(dateRegexBar)) {
        status = false;
    }
    return status;
}
exports.validateDateBirth = validateDateBirth;
function validateCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) {
        return false;
    }
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = soma % 11;
    let digito1 = resto < 2 ? 0 : 11 - resto;
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    let digito2 = resto < 2 ? 0 : 11 - resto;
    if (parseInt(cpf.charAt(9)) !== digito1 || parseInt(cpf.charAt(10)) !== digito2) {
        return false;
    }
    return true;
}
exports.validateCPF = validateCPF;
function validadeAddress(address) {
    let statusAddress = true;
    if (typeof address.state !== "number" || address.state <= 0 || address.state > 27 ||
        !address.city || address.city === "" ||
        !address.cep || address.cep === "" ||
        !address.district || address.district === "" ||
        typeof address.houseNumber !== "string" ||
        typeof address.publicPlace !== "string" ||
        address.publicPlace === "" ||
        (address.complement !== null && typeof address.complement !== "string")) {
        statusAddress = false;
    }
    return statusAddress;
}
exports.validadeAddress = validadeAddress;
const validateValueMonetary = (data) => {
    const regexValor = /^(\d{1,3}(,\d{3})*(\.\d{2})?|\d{1,3}(\.\d{3})*(,\d{2})?)$/;
    if (regexValor.test(data.averagePrice)) {
        const valorNumerico = parseFloat(data.averagePrice.replace(/,/g, '').replace(/\./, ''));
        if (valorNumerico > -1) {
            return true;
        }
    }
    return false;
};
exports.validateValueMonetary = validateValueMonetary;
