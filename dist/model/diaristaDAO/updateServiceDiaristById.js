"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbUpdateService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const dbUpdateService = async function (token, data) {
    try {
        const verifyServiceAndDiarist = await prisma.tbl_diarista_servico.findFirst({
            where: {
                id_servico: data.idService,
                id_diarista: Number(token.id)
            }
        });
        if (verifyServiceAndDiarist) {
            await prisma.tbl_servico_com_valor.updateMany({
                where: {
                    id_servico: data.idService
                },
                data: {
                    valor: data.newValue
                }
            });
        }
        else {
            return 404;
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
exports.dbUpdateService = dbUpdateService;
