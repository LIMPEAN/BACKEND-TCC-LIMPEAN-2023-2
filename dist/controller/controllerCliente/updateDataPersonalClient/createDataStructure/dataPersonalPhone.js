"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStructureSimpleDataPhone = void 0;
function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}
const createStructureSimpleDataPhone = (data) => {
    if (data.every(phone => phone.ddd !== null && phone.phone !== null &&
        phone.newDDD !== null && phone.newPhone !== null)) {
        let clientJson;
        for (const item of data) {
            clientJson = {
                oldDDD: item.ddd,
                oldPhone: item.phone,
                ddd: item.newDDD,
                numero_telefone: item.newPhone
            };
        }
        return clientJson;
    }
    else {
        return false;
    }
};
exports.createStructureSimpleDataPhone = createStructureSimpleDataPhone;
