"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbVerifyTokenService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const dbVerifyTokenService = async function (idClient, idService, token) {
    try {
        const serviceClient = await prisma.tbl_servico.findFirst({
            where: {
                id: idService
            }, select: {
                FK_ResidenciaCliente_Servico: {
                    select: {
                        id_cliente: true
                    }
                },
                FK_TokenServico_Servico: {
                    select: {
                        codigo: true
                    }
                }
            }
        });
        if (serviceClient && serviceClient.FK_ResidenciaCliente_Servico.id_cliente === idClient &&
            serviceClient.FK_TokenServico_Servico.codigo === token) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return 500;
    }
};
exports.dbVerifyTokenService = dbVerifyTokenService;
