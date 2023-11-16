"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginCliente = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const loginCliente = async function (dataBody) {
    try {
        const loginClient = await prisma.tbl_cliente.findFirst({
            where: {
                email: dataBody.email.toLowerCase(),
                senha: dataBody.password
            }
        });
        if (loginClient) {
            const statusContaClient = await prisma.tbl_status_conta_cliente.findFirst({
                where: {
                    id_cliente: loginClient.id,
                    id_status_conta: 1
                }
            });
            if (statusContaClient) {
                return {
                    id: loginClient.id,
                    email: loginClient.email,
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
exports.loginCliente = loginCliente;
