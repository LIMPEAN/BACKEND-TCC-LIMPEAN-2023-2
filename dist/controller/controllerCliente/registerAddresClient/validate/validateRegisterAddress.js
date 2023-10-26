"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTypesJson = exports.validateAddress = void 0;
function validateTypesJson(json) {
    try {
        const endereco = json;
        console.log('Endereco:', endereco);
        return (typeof endereco.address.typeHouse === 'number' &&
            typeof endereco.address.state === 'number' &&
            typeof endereco.address.city === 'string' &&
            typeof endereco.address.cep === 'string' &&
            (typeof endereco.address.publicPlace === 'string' || endereco.address.publicPlace === null) &&
            typeof endereco.address.district === 'string' &&
            (typeof endereco.address.complement === 'string' || endereco.address.complement === null) &&
            typeof endereco.address.houseNumber === 'string');
    }
    catch (error) {
        return false;
    }
}
exports.validateTypesJson = validateTypesJson;
function validateAddress(endereco) {
    return (typeof endereco.address.typeHouse === 'number' &&
        typeof endereco.address.state === 'number' &&
        endereco.address.state > 0 &&
        !!endereco.address.city &&
        !!endereco.address.cep &&
        !!endereco.address.district &&
        typeof endereco.address.houseNumber === 'string' &&
        (typeof endereco.address.publicPlace === 'string' || endereco.address.publicPlace === null) &&
        (typeof endereco.address.complement === 'string' || endereco.address.complement === null));
}
exports.validateAddress = validateAddress;
