"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbGetTokenServiceDiarist = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const dbGetTokenServiceDiarist = async function (idDiarist, emailDiarist, idService) {
    try {
        const verifyDiarist = await prisma.tbl_diarista.findFirst({
            where: {
                id: idDiarist,
                email: emailDiarist
            }
        });
        const serviceDiarist = await prisma.tbl_diarista_servico.findFirst({
            where: {
                id_diarista: verifyDiarist?.id,
                id_servico: idService
            }, select: {
                FK_Servico_DiaristaServico: {
                    select: {
                        FK_TokenServico_Servico: {
                            select: {
                                codigo: true
                            }
                        }
                    }
                }
            }
        });
        const statusServico = await prisma.tbl_status_servico.findMany({
            where: {
                id_servico: idService
            }, select: {
                id_status: true
            }
        });
        if (verifyDiarist && serviceDiarist && statusServico.some(it => it.id_status === 2) && !statusServico.some(it => it.id_status === 5)) {
            let token = serviceDiarist.FK_Servico_DiaristaServico.FK_TokenServico_Servico.codigo;
            return token;
        }
        else {
            return 404;
        }
    }
    catch (error) {
        return false;
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.dbGetTokenServiceDiarist = dbGetTokenServiceDiarist;
