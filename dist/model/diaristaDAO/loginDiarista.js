"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginDiarista = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const loginDiarista = async function (dataBody) {
    try {
        const loginDiarist = await prisma.tbl_diarista.findFirst({
            where: {
                email: dataBody.email.toLowerCase(),
                senha: dataBody.password
            }
        });
        if (loginDiarist) {
            const statusContaDiarist = await prisma.tbl_status_conta_diarista.findFirst({
                where: {
                    id_diarista: loginDiarist.id,
                    id_status_conta: 1
                }
            });
            if (statusContaDiarist) {
                return {
                    id: loginDiarist.id,
                    email: loginDiarist.email,
                };
            }
            else {
                return 401;
            }
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
exports.loginDiarista = loginDiarista;
