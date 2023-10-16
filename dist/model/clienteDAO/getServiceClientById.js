"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbGetServiceByID = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const dbGetServiceByID = async function (id, statusTypeService) {
    try {
        const client = await prisma.tbl_residencia_cliente.findMany({
            where: {
                id_cliente: id
            }
        });
        const service = await prisma.tbl_servico.findMany({
            where: {
                id_residencia_cliente: {
                    in: client.map(it => it.id)
                }
            }, select: {
                id: true,
                data_hora: true,
                observacao: true,
                tarefas_adicionais: true,
                FK_TipoLimpeza_Servico: {
                    select: {
                        nome: true
                    }
                },
                FK_ResidenciaCliente_Servico: {
                    select: {
                        FK_Cliente_Residencia: {
                            select: {
                                id: true,
                                nome: true,
                                biografia: true,
                                foto_perfil: true
                            }
                        },
                        FK_Endereco_Residencia: {
                            select: {
                                cep: true,
                                FK_Cidade_Endereco: {
                                    select: {
                                        nome: true,
                                        FK_Estado_Cidade: {
                                            select: {
                                                nome: true
                                            }
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            }
        });
        for (const it of client) {
        }
    }
    catch (error) {
        return false;
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.dbGetServiceByID = dbGetServiceByID;
