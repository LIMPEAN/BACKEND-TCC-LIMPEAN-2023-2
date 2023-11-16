"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDataAddressClient = exports.verifyPhoneClient = exports.updateDataPhone = exports.updateDataSimpleClient = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}
const verifyPhoneClient = async function (token, oldDDD, oldPhone, newDDD, newPhone) {
    try {
        const verifyClient = await prisma.tbl_cliente.findFirst({
            where: {
                AND: [
                    { email: token.name.toLowerCase() },
                    { id: Number(token.id) }
                ]
            }
        });
        if (verifyClient) {
            const tbl_telefone_cliente = await prisma.tbl_telefone_cliente.findFirst({
                where: {
                    id_cliente: verifyClient.id,
                    ddd: oldDDD,
                    numero_telefone: oldPhone
                }
            });
            const tbl_telefone_cliente_new = await prisma.tbl_telefone_cliente.findFirst({
                where: {
                    id_cliente: verifyClient.id,
                    ddd: newDDD,
                    numero_telefone: newPhone
                }
            });
            if (tbl_telefone_cliente && tbl_telefone_cliente_new === null) {
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
exports.verifyPhoneClient = verifyPhoneClient;
const updateDataSimpleClient = async function (token, data) {
    try {
        const verifyClient = await prisma.tbl_cliente.findFirst({
            where: {
                AND: [
                    { email: token.name.toLowerCase() },
                    { id: Number(token.id) }
                ]
            }
        });
        if (verifyClient) {
            await prisma.tbl_cliente.update({
                where: {
                    id: verifyClient.id
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
        console.log(error);
        return false;
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.updateDataSimpleClient = updateDataSimpleClient;
const updateDataPhone = async function (token, data) {
    try {
        const verifyClient = await prisma.tbl_cliente.findFirst({
            where: {
                AND: [
                    { email: token.name.toLowerCase() },
                    { id: Number(token.id) }
                ]
            }
        });
        if (verifyClient) {
            const tbl_telefone_cliente = await prisma.tbl_telefone_cliente.update({
                where: {
                    id_cliente: verifyClient.id,
                    numero_telefone: data.oldPhone
                },
                data: {
                    numero_telefone: data.numero_telefone,
                    ddd: data.ddd
                }
            });
            if (tbl_telefone_cliente) {
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
const updateDataAddressClient = async function (token, residenciaId, data) {
    try {
        const verifyCliente = await prisma.tbl_cliente.findFirst({
            where: {
                AND: [
                    { email: token.name.toLowerCase() },
                    { id: Number(token.id) }
                ]
            },
            include: {
                residencia: {
                    where: {
                        id: residenciaId
                    },
                    include: {
                        FK_Endereco_Residencia: true
                    }
                }
            }
        });
        if (!verifyCliente) {
            return false;
        }
        const residencia = verifyCliente.residencia[0];
        if (!residencia) {
            return false;
        }
        let statusUpdated = false;
        if (!isObjectEmpty(data.tbl_endereco)) {
            const updatedAddress = await prisma.tbl_endereco.update({
                where: {
                    id: verifyCliente.residencia[0].FK_Endereco_Residencia.id,
                },
                data: data.tbl_endereco,
            });
            if (updatedAddress) {
                statusUpdated = true;
            }
        }
        if (!isObjectEmpty(data.tbl_cidade)) {
            const updatedAddress = await prisma.tbl_cidade.update({
                where: {
                    id: verifyCliente.residencia[0].FK_Endereco_Residencia.id,
                },
                data: data.tbl_cidade,
            });
            if (updatedAddress) {
                statusUpdated = true;
            }
        }
        if (!isObjectEmpty(data.tbl_residencia_cliente)) {
            const updatedAddress = await prisma.tbl_residencia_cliente.update({
                where: {
                    id: verifyCliente.residencia[0].FK_Endereco_Residencia.id,
                },
                data: data.tbl_residencia_cliente,
            });
            if (updatedAddress) {
                statusUpdated = true;
            }
        }
        if (statusUpdated) {
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
exports.updateDataAddressClient = updateDataAddressClient;
