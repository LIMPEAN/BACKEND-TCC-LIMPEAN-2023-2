"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbUpdateServiceDiarist = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const dbUpdateServiceDiarist = async function (idDiarist, idService, idStatus) {
    try {
        let statusServiceClient;
        const verifyDiaristAndService = await prisma.tbl_diarista_servico.findFirst({
            where: {
                id_diarista: idDiarist,
                id_servico: idService
            }
        });
        if (verifyDiaristAndService) {
            const statusService = await prisma.tbl_status_servico.findMany({
                where: {
                    id_servico: idService
                }, select: {
                    id_status: true
                }
            });
            if (!statusService.some((it) => it.id_status === idStatus || it.id_status === 5)) {
                await prisma.tbl_status_servico.create({
                    data: {
                        id_servico: idService,
                        id_status: idStatus,
                        data_hora: new Date()
                    }
                });
                statusServiceClient = true;
            }
            else {
                statusServiceClient = false;
            }
            return statusServiceClient;
        }
        else {
            if (idService !== 5 && idService !== 4 && idService !== 3) {
                await prisma.tbl_diarista_servico.updateMany({
                    where: {
                        id_servico: idService
                    }, data: {
                        id_diarista: idDiarist
                    }
                });
                await prisma.tbl_status_servico.create({
                    data: {
                        id_servico: idService,
                        id_status: idStatus,
                        data_hora: new Date()
                    }
                });
                statusServiceClient = true;
            }
            else {
                statusServiceClient = false;
            }
            return statusServiceClient;
        }
    }
    catch (error) {
        return false;
    }
};
exports.dbUpdateServiceDiarist = dbUpdateServiceDiarist;
