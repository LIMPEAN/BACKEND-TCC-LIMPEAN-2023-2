"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const registerUser = async function (dataBody) {
    let transaction;
    try {
        const verifyClient = await prisma.tbl_cliente.findFirst({
            where: {
                OR: [
                    { email: dataBody.email.toLowerCase() },
                    { cpf: dataBody.cpf }
                ]
            }
        });
        if (!verifyClient) {
            transaction = await prisma.$transaction(async (prisma) => {
                const tbl_cidade = await prisma.tbl_cidade.create({
                    data: {
                        nome: dataBody.address.city,
                        id_estado: dataBody.address.state
                    }
                });
                const tbl_endereco = await prisma.tbl_endereco.create({
                    data: {
                        logradouro: dataBody.address.publicPlace,
                        bairro: dataBody.address.district,
                        cep: dataBody.address.cep,
                        numero_residencia: dataBody.address.houseNumber,
                        complemento: dataBody.address.complement,
                        id_cidade: tbl_cidade.id
                    }
                });
                const tbl_cliente = await prisma.tbl_cliente.create({
                    data: {
                        nome: dataBody.nameUser,
                        cpf: dataBody.cpf,
                        data_nascimento: new Date(dataBody.birthDate),
                        biografia: dataBody.biography,
                        foto_perfil: dataBody.photoUser,
                        email: dataBody.email.toLowerCase(),
                        senha: dataBody.password,
                        id_genero: dataBody.idGender
                    }
                });
                await prisma.tbl_telefone_cliente.create({
                    data: {
                        numero_telefone: dataBody.phone,
                        ddd: dataBody.ddd,
                        id_cliente: tbl_cliente.id
                    }
                });
                await prisma.tbl_residencia_cliente.create({
                    data: {
                        id_cliente: tbl_cliente.id,
                        id_endereco: tbl_endereco.id,
                        id_tipo_residencia: dataBody.address.typeHouse
                    }
                });
                await prisma.tbl_status_conta_cliente.create({
                    data: {
                        data_status: new Date(),
                        id_cliente: tbl_cliente.id,
                        id_status_conta: 1
                    }
                });
            });
        }
        else {
            return false;
        }
        return true;
    }
    catch (error) {
        return false;
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.registerUser = registerUser;
