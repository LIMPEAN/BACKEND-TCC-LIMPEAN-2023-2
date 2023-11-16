"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStructureSimpleDataAddress = void 0;
const createStructureSimpleDataAddress = (data) => {
    if (data.state === null && data.city === null && data.cep === null && data.publicPlace === null &&
        data.complement === null && data.district === null && data.houseNumber === null) {
        return false;
    }
    else {
        let diaristJson = {};
        diaristJson.tbl_cidade = {};
        diaristJson.tbl_endereco = {};
        if (data.state !== null) {
            diaristJson.tbl_cidade.id_estado = data.state;
        }
        if (data.city !== null) {
            diaristJson.tbl_cidade.nome = data.city;
        }
        if (data.cep !== null) {
            diaristJson.tbl_endereco.cep = data.cep;
        }
        if (data.publicPlace !== null) {
            diaristJson.tbl_endereco.logradouro = data.publicPlace;
        }
        if (data.complement !== null) {
            diaristJson.tbl_endereco.complemento = data.complement;
        }
        if (data.district !== null) {
            diaristJson.tbl_endereco.bairro = data.district;
        }
        if (data.houseNumber !== null) {
            diaristJson.tbl_endereco.numero_residencia = data.houseNumber;
        }
        return diaristJson;
    }
};
exports.createStructureSimpleDataAddress = createStructureSimpleDataAddress;
