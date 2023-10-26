"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validadeDataResidence = exports.validateTypesJson = exports.validadeAddress = exports.validatePhoneWithDDD = exports.validateDateBirth = exports.validateCPF = exports.validateEmail = void 0;
function validateTypesJson(json) {
    try {
        const cliente = json;
        if (typeof cliente.email !== 'string' ||
            typeof cliente.password !== 'string' ||
            typeof cliente.nameUser !== 'string' ||
            typeof cliente.photoUser !== 'string' ||
            typeof cliente.phone !== 'string' ||
            typeof cliente.ddd !== 'string' ||
            typeof cliente.birthDate !== 'string' ||
            typeof cliente.idGender !== 'number' ||
            typeof cliente.cpf !== 'string' ||
            (typeof cliente.biography !== 'string' &&
                cliente.biography !== null) ||
            typeof cliente.address !== 'object' ||
            typeof cliente.address.state !== 'number' ||
            typeof cliente.address.city !== 'string' ||
            typeof cliente.address.cep !== 'string' ||
            (typeof cliente.address.publicPlace !== 'string' &&
                cliente.address.publicPlace !== null) ||
            typeof cliente.address.district !== 'string' ||
            (typeof cliente.address.complement !== 'string' &&
                cliente.address.complement !== null) ||
            typeof cliente.address.houseNumber !== 'string') {
            return false;
        }
        return true;
    }
    catch (error) {
        return false;
    }
}
exports.validateTypesJson = validateTypesJson;
function validadeDataResidence(dataResidence) {
    let status = true;
    if (dataResidence.typeResidence === "" || dataResidence.numberRooms <= 0) {
        status = false;
    }
    return status;
}
exports.validadeDataResidence = validadeDataResidence;
function validatePhoneWithDDD(ddd, phone) {
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
    if (typeof address.typeHouse !== "number" ||
        typeof address.state !== "number" || address.state <= 0 ||
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
