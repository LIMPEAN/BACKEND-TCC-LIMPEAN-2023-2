"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const registerUser = async function (dataBody) {
    let transaction;
    try {
        const verifyDiarist = await prisma.tbl_diarista.findFirst({
            where: {
                OR: [
                    { email: dataBody.email.toLowerCase() },
                    { cpf: dataBody.cpf }
                ]
            }
        });
        if (!verifyDiarist) {
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
                const tbl_diarista = await prisma.tbl_diarista.create({
                    data: {
                        nome: dataBody.nameUser,
                        cpf: dataBody.cpf,
                        data_nascimento: new Date(dataBody.birthDate.replace(/\//g, '-')),
                        biografia: dataBody.biography,
                        media_valor: dataBody.averagePrice,
                        foto_perfil: dataBody.photoUser,
                        email: dataBody.email.toLowerCase(),
                        senha: dataBody.password,
                        id_genero: dataBody.idGender,
                        id_endereco: tbl_endereco.id
                    }
                });
                await prisma.tbl_telefone_diarista.create({
                    data: {
                        numero_telefone: dataBody.phone,
                        ddd: dataBody.ddd,
                        id_diarista: tbl_diarista.id
                    }
                });
                await prisma.tbl_status_conta_diarista.create({
                    data: {
                        data_status: new Date(),
                        id_diarista: tbl_diarista.id,
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
        console.log(error);
        return false;
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.registerUser = registerUser;
