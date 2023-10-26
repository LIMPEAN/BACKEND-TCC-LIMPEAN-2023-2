"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStructureSimpleDataPersonal = void 0;
function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}
const createStructureSimpleDataPersonal = (data) => {
    const clientJson = {};
    if (data.name !== null) {
        clientJson.nome = data.name;
    }
    if (data.biography !== null) {
        clientJson.biografia = data.biography;
    }
    if (data.idGender !== null) {
        clientJson.id_genero = data.idGender;
    }
    if (data.password !== null) {
        clientJson.senha = data.password;
    }
    if (data.photoUser !== null) {
        clientJson.foto_perfil = data.photoUser;
    }
    if (!isObjectEmpty(clientJson)) {
        return clientJson;
    }
    else {
        return false;
    }
};
exports.createStructureSimpleDataPersonal = createStructureSimpleDataPersonal;
