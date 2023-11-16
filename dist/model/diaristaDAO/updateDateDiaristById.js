"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDataAddressDiarist = exports.updateDataPhone = exports.updateDataSimpleDiarist = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}
const updateDataSimpleDiarist = async function (token, data) {
    try {
        const verifyDiarist = await prisma.tbl_diarista.findFirst({
            where: {
                AND: [
                    { email: token.name.toLowerCase() },
                    { id: Number(token.id) }
                ]
            }
        });
        if (verifyDiarist) {
            await prisma.tbl_diarista.update({
                where: {
                    id: verifyDiarist.id
                },
                data: data
            });
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.updateDataSimpleDiarist = updateDataSimpleDiarist;
const updateDataPhone = async function (token, data) {
    try {
        const verifyDiarist = await prisma.tbl_diarista.findFirst({
            where: {
                AND: [
                    { email: token.name.toLowerCase() },
                    { id: Number(token.id) }
                ]
            }
        });
        if (verifyDiarist) {
            const tbl_telefone_diarista = await prisma.tbl_telefone_diarista.update({
                where: {
                    id_diarista: verifyDiarist.id,
                    numero_telefone: data.oldPhone
                },
                data: {
                    numero_telefone: data.numero_telefone,
                    ddd: data.ddd
                }
            });
            if (tbl_telefone_diarista) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.updateDataPhone = updateDataPhone;
const updateDataAddressDiarist = async function (token, data) {
    try {
        const verifyDiarist = await prisma.tbl_diarista.findFirst({
            where: {
                AND: [
                    { email: token.name.toLowerCase() },
                    { id: Number(token.id) }
                ]
            },
            include: {
                FK_Endereco_Diarista: true,
            }
        });
        let tbl_endereco;
        let statusUpdated = false;
        if (verifyDiarist) {
            if (!isObjectEmpty(data.tbl_endereco)) {
                tbl_endereco = await prisma.tbl_endereco.update({
                    where: {
                        id: verifyDiarist.FK_Endereco_Diarista.id,
                    },
                    data: data.tbl_endereco,
                });
                if (tbl_endereco) {
                    statusUpdated = true;
                }
            }
            if (!isObjectEmpty(data.tbl_cidade)) {
                tbl_endereco = await prisma.tbl_endereco.findFirst({
                    where: {
                        id: verifyDiarist.FK_Endereco_Diarista.id,
                    }
                });
                if (tbl_endereco) {
                    await prisma.tbl_cidade.update({
                        where: {
                            id: tbl_endereco.id,
                        },
                        data: data.tbl_cidade,
                    });
                    statusUpdated = true;
                }
            }
            return statusUpdated;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.updateDataAddressDiarist = updateDataAddressDiarist;
