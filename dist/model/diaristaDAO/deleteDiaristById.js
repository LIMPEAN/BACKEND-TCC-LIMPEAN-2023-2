"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDiarist = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const deleteDiarist = async function (id, name) {
    try {
        const verifyDiarist = await prisma.tbl_diarista.findFirst({
            where: {
                AND: [
                    { email: name.toLowerCase() },
                    { id: id }
                ]
            }
        });
        if (verifyDiarist) {
            await prisma.tbl_status_conta_diarista.update({
                where: {
                    id: verifyDiarist.id
                },
                data: {
                    data_status: new Date(),
                    id_status_conta: 2
                }
            });
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
};
exports.deleteDiarist = deleteDiarist;
