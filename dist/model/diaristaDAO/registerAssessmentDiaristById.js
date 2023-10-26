"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbRegisterAssessmentDiarist = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const dbRegisterAssessmentDiarist = async function (token, data) {
    try {
        const verifyDiarist = await prisma.tbl_diarista.findFirst({
            where: {
                AND: [
                    { id: Number(token.id) },
                    { email: token.name }
                ]
            }
        });
        const verifyClient = await prisma.tbl_cliente.findFirst({
            where: {
                id: data.personEvaluatedId
            }
        });
        const verifyRegisterAssessment = await prisma.tbl_avaliacao_cliente.findFirst({
            where: {
                id_diarista: verifyDiarist?.id,
                id_cliente: verifyClient?.id,
                data_hora: `${data.date.replace(/\//g, '-')}T${data.hour}:00Z`
            }
        });
        if (verifyDiarist && verifyClient && !verifyRegisterAssessment) {
            await prisma.tbl_avaliacao_cliente.create({
                data: {
                    id_diarista: Number(token.id),
                    id_cliente: data.personEvaluatedId,
                    quantidade_estrelas: data.star,
                    comentario: data.comment,
                    data_hora: `${data.date.replace(/\//g, '-')}T${data.hour}:00Z`
                }
            });
            return true;
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
exports.dbRegisterAssessmentDiarist = dbRegisterAssessmentDiarist;
