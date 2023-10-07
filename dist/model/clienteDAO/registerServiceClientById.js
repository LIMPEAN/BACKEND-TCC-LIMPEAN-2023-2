"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbRegisterService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const dbRegisterService = async (token, data) => {
    try {
        let statusDiarist = false;
        const verifyClient = await prisma.tbl_cliente.findFirst({
            where: {
                AND: [
                    { email: token.name.toLowerCase() },
                    { id: Number(token.id) }
                ]
            }
        });
        const verifyAddress = await prisma.tbl_residencia_cliente.findFirst({
            where: {
                id_cliente: verifyClient?.id,
                id_endereco: data.addressId
            }
        });
        const verifyDiarist = await prisma.tbl_diarista.findFirst({
            where: {
                id: data.diaristId !== null ? data.diaristId : 0
            }
        });
        const verifyService = await prisma.tbl_servico.findFirst({
            where: {
                data_hora: `${data.date}T${data.startHour}:00Z`,
                id_residencia_cliente: verifyAddress?.id
            }
        });
        if (data.diaristId === null || (typeof data.diaristId === "number" && verifyDiarist)) {
            statusDiarist = true;
        }
        if (verifyClient && verifyAddress && verifyService === null && statusDiarist) {
            let transaction = await prisma.$transaction(async (prisma) => {
                const service = await prisma.tbl_servico.create({
                    data: {
                        data_hora: `${data.date}T${data.startHour}:00Z`,
                        tarefas_adicionais: data.additionalTasks,
                        observacao: data.observation,
                        id_residencia_cliente: verifyAddress.id,
                        id_tipo_limpeza: data.typeCleaningId
                    }
                });
                const serviceWithValue = await prisma.tbl_servico_com_valor.create({
                    data: {
                        valor: data.value,
                        id_servico: service.id
                    }
                });
                const servico_comodo = await prisma.tbl_servico_comodo.createMany({
                    data: [
                        {
                            id_servico: service.id,
                            id_comodo: 1,
                            quantidade: data.bedroom
                        },
                        {
                            id_servico: service.id,
                            id_comodo: 2,
                            quantidade: data.livingRoom
                        },
                        {
                            id_servico: service.id,
                            id_comodo: 3,
                            quantidade: data.kitchen
                        },
                        {
                            id_servico: service.id,
                            id_comodo: 4,
                            quantidade: data.bathroom
                        },
                        {
                            id_servico: service.id,
                            id_comodo: 5,
                            quantidade: data.office
                        },
                        {
                            id_servico: service.id,
                            id_comodo: 6,
                            quantidade: data.laundry
                        },
                        {
                            id_servico: service.id,
                            id_comodo: 7,
                            quantidade: data.garage
                        },
                        {
                            id_servico: service.id,
                            id_comodo: 8,
                            quantidade: data.yard
                        },
                        {
                            id_servico: service.id,
                            id_comodo: 9,
                            quantidade: data.recreationArea
                        }
                    ]
                });
                const statusService = await prisma.tbl_status_servico.create({
                    data: {
                        id_servico: service.id,
                        id_status: 1,
                        data_hora: `${data.date}T${data.startHour}:00Z`
                    }
                });
                const statusForm = await prisma.tbl_formulario.createMany({
                    data: [
                        {
                            id_perguntas: 1,
                            id_servico: service.id,
                            check: data.hasChildren
                        },
                        {
                            id_perguntas: 2,
                            id_servico: service.id,
                            check: data.hasPet
                        }
                    ]
                });
                const diaristService = await prisma.tbl_diarista_servico.create({
                    data: {
                        id_servico: service.id,
                        id_diarista: data.diaristId
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
};
exports.dbRegisterService = dbRegisterService;
