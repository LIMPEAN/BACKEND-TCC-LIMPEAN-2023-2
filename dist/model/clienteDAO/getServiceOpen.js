"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceOpen = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getServiceOpen = async function () {
    try {
        const service = await prisma.tbl_diarista_servico.findMany({
            where: {
                id_servico: {
                    gt: 0,
                },
                id_diarista: {
                    equals: null,
                },
            },
            include: {
                FK_Servico_DiaristaServico: {
                    select: {
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
                    },
                },
            },
        });
        const serviceClient = [];
        for (const it of service) {
            const serviceValue = await prisma.tbl_servico_com_valor.findFirst({
                where: {
                    id_servico: it.FK_Servico_DiaristaServico.id,
                },
                select: {
                    valor: true,
                },
            });
            const serviceRoom = await prisma.tbl_servico_comodo.findMany({
                where: {
                    id_servico: it.FK_Servico_DiaristaServico.id,
                },
                include: {
                    FK_Comodo_ServicoComodo: {
                        select: {
                            nome: true,
                        },
                    },
                },
            });
            const form = await prisma.tbl_formulario.findMany({
                where: {
                    id_servico: it.FK_Servico_DiaristaServico.id,
                },
                include: {
                    FK_Perguntas_Formulario: {
                        select: {
                            pergunta: true,
                        },
                    },
                }
            });
            const statusService = await prisma.tbl_status_servico.findMany({
                where: {
                    id_servico: it.FK_Servico_DiaristaServico.id,
                },
                include: {
                    FK_Status_StatusServico: {
                        select: {
                            nome: true,
                        },
                    },
                }
            });
            const statusAccountClient = await prisma.tbl_status_conta_cliente.findFirst({
                where: {
                    id_cliente: it.FK_Servico_DiaristaServico.FK_ResidenciaCliente_Servico.FK_Cliente_Residencia.id,
                    id_status_conta: 1
                }
            });
            if (statusAccountClient)
                serviceClient.push({
                    service: {
                        serviceId: it.id,
                        status_service: statusService.map((it) => ({
                            status: it.FK_Status_StatusServico.nome,
                            data_hora: it.data_hora,
                        })),
                        name: it.FK_Servico_DiaristaServico.FK_ResidenciaCliente_Servico.FK_Cliente_Residencia.nome,
                        photo: it.FK_Servico_DiaristaServico.FK_ResidenciaCliente_Servico.FK_Cliente_Residencia.foto_perfil,
                        biography: it.FK_Servico_DiaristaServico.FK_ResidenciaCliente_Servico.FK_Cliente_Residencia.biografia,
                        type_clean: it.FK_Servico_DiaristaServico.FK_TipoLimpeza_Servico.nome,
                        date_hour: it.FK_Servico_DiaristaServico.data_hora,
                        obeservation: it.FK_Servico_DiaristaServico.observacao,
                        tasks: it.FK_Servico_DiaristaServico.tarefas_adicionais,
                        value: serviceValue?.valor,
                        question: form.map((it) => ({
                            asks: it.FK_Perguntas_Formulario.pergunta,
                            answer: it.check,
                        })),
                        room: serviceRoom.map((it) => ({
                            name: it.FK_Comodo_ServicoComodo.nome,
                            quantity: it.quantidade,
                        })),
                        address: {
                            state: it.FK_Servico_DiaristaServico.FK_ResidenciaCliente_Servico.FK_Endereco_Residencia.FK_Cidade_Endereco.FK_Estado_Cidade.nome,
                            city: it.FK_Servico_DiaristaServico.FK_ResidenciaCliente_Servico.FK_Endereco_Residencia.FK_Cidade_Endereco.nome,
                            cep: it.FK_Servico_DiaristaServico.FK_ResidenciaCliente_Servico.FK_Endereco_Residencia.cep
                        },
                    },
                });
        }
        const allServiceOpen = serviceClient.filter(client => {
            const status = client.service.status_service;
            return status.every(status => status.status === "Em aberto");
        });
        if (allServiceOpen.length > 0) {
            return allServiceOpen;
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
exports.getServiceOpen = getServiceOpen;
