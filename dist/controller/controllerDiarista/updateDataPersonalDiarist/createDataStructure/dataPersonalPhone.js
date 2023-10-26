"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStructureSimpleDataPhone = void 0;
function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}
const createStructureSimpleDataPhone = (data) => {
    if (data.every(phone => phone.ddd !== null && phone.phone !== null &&
        phone.newDDD !== null && phone.newPhone !== null)) {
        let diaristJson;
        for (const item of data) {
            diaristJson = {
                oldDDD: item.ddd,
                oldPhone: item.phone,
                ddd: item.newDDD,
                numero_telefone: item.newPhone
            };
        }
        return diaristJson;
    }
    else {
        return false;
    }
};
exports.createStructureSimpleDataPhone = createStructureSimpleDataPhone;
