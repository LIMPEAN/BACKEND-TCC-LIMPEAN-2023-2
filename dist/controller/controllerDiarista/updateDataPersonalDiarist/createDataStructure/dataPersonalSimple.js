"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStructureSimpleDataPersonal = void 0;
function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}
const createStructureSimpleDataPersonal = (data) => {
    const diaristJson = {};
    if (data.name !== null) {
        diaristJson.nome = data.name;
    }
    if (data.biography !== null) {
        diaristJson.biografia = data.biography;
    }
    if (data.idGender !== null) {
        diaristJson.id_genero = data.idGender;
    }
    if (data.password !== null) {
        diaristJson.senha = data.password;
    }
    if (data.photoUser !== null) {
        diaristJson.foto_perfil = data.photoUser;
    }
    if (data.averagePrice !== null) {
        diaristJson.media_valor = data.averagePrice;
    }
    if (!isObjectEmpty(diaristJson)) {
        return diaristJson;
    }
    else {
        return false;
    }
};
exports.createStructureSimpleDataPersonal = createStructureSimpleDataPersonal;
