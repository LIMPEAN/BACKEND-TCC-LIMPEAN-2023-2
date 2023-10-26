"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const deleteClient = async function (id, email) {
    try {
        const verifyClient = await prisma.tbl_cliente.findFirst({
            where: {
                AND: [
                    { email: email.toLowerCase() },
                    { id: id }
                ]
            }
        });
        if (verifyClient) {
            await prisma.tbl_status_conta_cliente.update({
                where: {
                    id: verifyClient.id
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
exports.deleteClient = deleteClient;
