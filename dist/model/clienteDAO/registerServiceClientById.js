"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbRegisterService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function generateRandomString() {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}
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
        if (data.diaristId === null || (typeof data.diaristId === "number" && verifyDiarist)) {
            statusDiarist = true;
        }
        let isInvitation = true;
        if (data.diaristId === null) {
            isInvitation = false;
        }
        if (verifyClient && verifyAddress && statusDiarist) {
            let transaction = await prisma.$transaction(async (prisma) => {
                const tokenService = await prisma.tbl_token_servico.create({
                    data: {
                        codigo: generateRandomString()
                    }
                });
                const service = await prisma.tbl_servico.create({
                    data: {
                        data_hora: `${data.date.replace(/\//g, '-')}T${data.startHour}:00Z`,
                        tarefas_adicionais: data.additionalTasks,
                        convite: isInvitation,
                        observacao: data.observation,
                        id_residencia_cliente: verifyAddress.id,
                        id_tipo_limpeza: data.typeCleaningId,
                        id_token_servico: tokenService.id
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
                        data_hora: `${data.date.replace(/\//g, '-')}T${data.startHour}:00Z`
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
        console.log(error);
        return false;
    }
};
exports.dbRegisterService = dbRegisterService;
