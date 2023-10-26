"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDiarist = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllDiarist = async function () {
    try {
        const dataDiarist = await prisma.tbl_diarista.findMany({
            where: {
                id: {
                    gt: 0
                }
            }, include: {
                FK_Endereco_Diarista: {
                    select: {
                        numero_residencia: true,
                        cep: true,
                        bairro: true,
                        logradouro: true,
                        complemento: true,
                        FK_Cidade_Endereco: {
                            select: {
                                nome: true,
                                FK_Estado_Cidade: {
                                    select: {
                                        nome: true
                                    }
                                }
                            }
                        }
                    }
                },
                FK_Genero_Diarista: {
                    select: {
                        nome: true
                    }
                }
            }
        });
        const diarist = [];
        for (const it of dataDiarist) {
            const dataPhoneDiarist = await prisma.tbl_telefone_diarista.findMany({
                where: {
                    id_diarista: it.id
                }, select: {
                    ddd: true,
                    numero_telefone: true
                }
            });
            const dataStatusRegisterDiarist = await prisma.tbl_status_conta_diarista.findMany({
                where: {
                    id_diarista: it.id
                }, select: {
                    data_status: true,
                    FK_StatusConta_StatusContaDiarista: {
                        select: {
                            status: true
                        }
                    }
                }
            });
            const assessementDiarist = await prisma.tbl_avaliacao_diarista.findMany({
                where: {
                    id_diarista: it.id
                }, select: {
                    comentario: true,
                    quantidade_estrelas: true
                }
            });
            diarist.push({
                user: {
                    id_diarist: it.id,
                    status_Conta: dataStatusRegisterDiarist.map((it) => ({
                        data: it.data_status,
                        status: it.FK_StatusConta_StatusContaDiarista.status
                    })),
                    nome: it.nome,
                    cpf: it.cpf,
                    data_nascimento: it.data_nascimento,
                    biografia: it.biografia,
                    foto_perfil: it.foto_perfil,
                    email: it.email,
                    media_valor: it.media_valor,
                    genero: it.FK_Genero_Diarista.nome,
                    assessment: assessementDiarist.map((it) => ({
                        stars: it.quantidade_estrelas,
                        comment: it.comentario
                    })),
                    telefone: dataPhoneDiarist.map((it) => ({
                        ddd: it.ddd,
                        numero: it.numero_telefone
                    })),
                    address: [{
                            state: it.FK_Endereco_Diarista.FK_Cidade_Endereco.FK_Estado_Cidade.nome,
                            city: it.FK_Endereco_Diarista.FK_Cidade_Endereco.nome,
                            logradouro: it.FK_Endereco_Diarista.logradouro,
                            bairro: it.FK_Endereco_Diarista.bairro,
                            cep: it.FK_Endereco_Diarista.cep,
                            complento: it.FK_Endereco_Diarista.complemento
                        }]
                }
            });
        }
        return diarist;
    }
    catch (error) {
        return false;
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.getAllDiarist = getAllDiarist;
