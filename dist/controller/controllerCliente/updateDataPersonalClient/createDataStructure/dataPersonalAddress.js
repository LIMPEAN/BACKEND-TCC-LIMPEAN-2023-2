"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStructureSimpleDataAddress = void 0;
const createStructureSimpleDataAddress = (data) => {
    if (data.typeHouse === null &&
        data.state === null &&
        data.city === null &&
        data.cep === null &&
        data.publicPlace === null &&
        data.complement === null &&
        data.district === null &&
        data.houseNumber === null) {
        return false;
    }
    else {
        const addressData = {
            tbl_cidade: {},
            tbl_endereco: {},
            tbl_residencia_cliente: {},
        };
        if (data.typeHouse !== null) {
            addressData.tbl_residencia_cliente.id_tipo_residencia = data.typeHouse;
        }
        if (data.state !== null) {
            addressData.tbl_cidade.id_estado = data.state;
        }
        if (data.city !== null) {
            addressData.tbl_cidade.nome = data.city;
        }
        if (data.cep !== null) {
            addressData.tbl_endereco.cep = data.cep;
        }
        if (data.publicPlace !== null) {
            addressData.tbl_endereco.logradouro = data.publicPlace;
        }
        if (data.complement !== null) {
            addressData.tbl_endereco.complemento = data.complement;
        }
        if (data.district !== null) {
            addressData.tbl_endereco.bairro = data.district;
        }
        if (data.houseNumber !== null) {
            addressData.tbl_endereco.numero_residencia = data.houseNumber;
        }
        return addressData;
    }
};
exports.createStructureSimpleDataAddress = createStructureSimpleDataAddress;
