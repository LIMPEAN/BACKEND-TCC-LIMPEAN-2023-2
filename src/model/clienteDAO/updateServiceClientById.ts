import { Token } from "../../interfaceGlobal/token"
import { UpdateService } from "../../controller/controllerCliente/updateService/interface/updateService"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const dbUpdateService = async function(token: Token, data: UpdateService){
    try {
        
        const verifyServiceAndClient = await prisma.tbl_status_servico.findMany({
            where: {
                id_servico: data.idService
            }, select: {
                id_status: true,
                FK_Servico_StatusServico: {
                    select: {
                        FK_ResidenciaCliente_Servico: {
                            select: {
                                FK_Cliente_Residencia: {
                                    select: {
                                        id: true,
                                        email: true
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })

        if(verifyServiceAndClient && verifyServiceAndClient.every(
            it => it.FK_Servico_StatusServico.FK_ResidenciaCliente_Servico.FK_Cliente_Residencia.email === token.name) &&
            verifyServiceAndClient.every(it => it.FK_Servico_StatusServico.FK_ResidenciaCliente_Servico.FK_Cliente_Residencia.id)
            ){
                
            }


    } catch (error) {
        
    }
}