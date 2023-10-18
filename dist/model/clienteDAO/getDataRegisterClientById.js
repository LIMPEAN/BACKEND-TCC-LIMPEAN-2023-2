"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataRegisterClientById = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getDataRegisterClientById = async function (id, name) {
    try {
        const client = await prisma.tbl_residencia_cliente.findMany({
            where: {
                id_cliente: id
            }, include: {
                FK_Cliente_Residencia: {
                    select: {
                        nome: true,
                        cpf: true,
                        biografia: true,
                        foto_perfil: true,
                        data_nascimento: true,
                        email: true,
                        FK_Genero_Cliente: {
                            select: {
                                nome: true
                            }
                        }
                    }
                }
            },
            distinct: ['id_cliente']
        });
        const statusClient = await prisma.tbl_status_conta_cliente.findFirst({
            where: {
                id_cliente: id
            }, include: {
                FK_StatusConta_StatusContaCliente: {
                    select: {
                        status: true
                    }
                }
            },
        });
        const assessmentClient = await prisma.tbl_avaliacao_cliente.findMany({
            where: {
                id_cliente: id,
            }, select: {
                data_hora: true,
                comentario: true,
                quantidade_estrelas: true,
                FK_Diarista_AvaliacaoCliente: {
                    select: {
                        nome: true,
                        foto_perfil: true
                    }
                }
            }
        });
        const phone = await prisma.tbl_telefone_cliente.findMany({
            where: {
                id_cliente: id
            }, select: {
                ddd: true,
                numero_telefone: true
            }
        });
        const address = await prisma.tbl_residencia_cliente.findMany({
            where: {
                id_cliente: id
            }, include: {
                FK_TipoResidencia_Residencia: {
                    select: {
                        nome: true
                    }
                },
                FK_Endereco_Residencia: {
                    select: {
                        id: true,
                        logradouro: true,
                        bairro: true,
                        cep: true,
                        numero_residencia: true,
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
                }
            }
        });
        const dataClient = client.map((it) => ({
            client: {
                statusClient: statusClient?.FK_StatusConta_StatusContaCliente.status,
                name: it.FK_Cliente_Residencia.nome,
                cpf: it.FK_Cliente_Residencia.cpf,
                biography: it.FK_Cliente_Residencia.biografia,
                photoUser: it.FK_Cliente_Residencia.foto_perfil,
                email: it.FK_Cliente_Residencia.email,
                gender: it.FK_Cliente_Residencia.FK_Genero_Cliente.nome,
                phone: phone.map((it) => ({
                    ddd: it.ddd,
                    numero: it.numero_telefone
                })),
                assessement: assessmentClient.map((it) => ({
                    name: it.FK_Diarista_AvaliacaoCliente.nome,
                    photo: it.FK_Diarista_AvaliacaoCliente.foto_perfil,
                    stars: it.quantidade_estrelas,
                    comment: it.comentario,
                    dataHour: it.data_hora
                })),
                endereco: address.map((it) => ({
                    id_address: it.FK_Endereco_Residencia.id,
                    state: it.FK_Endereco_Residencia.FK_Cidade_Endereco.FK_Estado_Cidade.nome,
                    city: it.FK_Endereco_Residencia.FK_Cidade_Endereco.nome,
                    typeHouse: it.FK_TipoResidencia_Residencia.nome,
                    cep: it.FK_Endereco_Residencia.cep,
                    publicPlace: it.FK_Endereco_Residencia.logradouro,
                    complement: it.FK_Endereco_Residencia.complemento,
                    district: it.FK_Endereco_Residencia.bairro,
                    houseNumber: it.FK_Endereco_Residencia.numero_residencia
                }))
            }
        }));
        if (dataClient) {
            return dataClient;
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
exports.getDataRegisterClientById = getDataRegisterClientById;
