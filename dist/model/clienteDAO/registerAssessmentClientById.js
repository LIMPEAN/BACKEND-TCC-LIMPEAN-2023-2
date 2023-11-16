"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbRegisterAssessmentClient = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const dbRegisterAssessmentClient = async function (token, data) {
    try {
        const verifyClient = await prisma.tbl_cliente.findFirst({
            where: {
                AND: [
                    { email: token.name.toLowerCase() },
                    { id: Number(token.id) }
                ]
            }
        });
        const verifyDiarist = await prisma.tbl_diarista.findFirst({
            where: {
                id: Number(token.id)
            }
        });
        const verifyRegisterAssessment = await prisma.tbl_avaliacao_cliente.findFirst({
            where: {
                id_diarista: verifyDiarist?.id,
                id_cliente: verifyClient?.id,
                data_hora: `${data.date.replace(/\//g, '-')}T${data.hour}:00Z`
            }
        });
        if (verifyClient && verifyDiarist && !verifyRegisterAssessment) {
            const registerAssessmentDiarist = await prisma.tbl_avaliacao_diarista.create({
                data: {
                    id_client: Number(token.id),
                    id_diarista: data.personEvaluatedId,
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
exports.dbRegisterAssessmentClient = dbRegisterAssessmentClient;
