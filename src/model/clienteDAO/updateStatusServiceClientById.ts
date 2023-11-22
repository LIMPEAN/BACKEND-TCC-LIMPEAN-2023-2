import { PrismaClient } from "@prisma/client"
import { UpdateStatusService } from "../../controller/controllerCliente/updateService/interface/updateStatusService"
import { Token } from "../../interfaceGlobal/token"

const prisma = new PrismaClient()

const dbUpdateStatusService = async function(token: Token, data: UpdateStatusService){

    try {
        
        const verifyServiceAndClient = await prisma.tbl_status_servico.findMany({
            where: {
                id_servico: data.idService
            }, select: {
                id_status: true,
                id_servico: true,
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

        if(verifyServiceAndClient.length > 0 && verifyServiceAndClient.every(
            it => it.FK_Servico_StatusServico.FK_ResidenciaCliente_Servico.FK_Cliente_Residencia.email === token.name) &&
            verifyServiceAndClient.every(it => it.FK_Servico_StatusServico.FK_ResidenciaCliente_Servico.FK_Cliente_Residencia.id === Number(token.id) &&
            !verifyServiceAndClient.some(it => it.id_status === data.idStatus)
            )){    
                
                await prisma.tbl_status_servico.create({
                data: {
                    id_servico: data.idService,
                    data_hora: `${data.date.replace(/\//g, '-')}T${data.hour}:00Z`,
                    id_status: data.idStatus
                }})

                console.log("enr");
                
                return true

            }else{                                
                return 404
            }

    } catch (error) {
        return false
    }finally {
        await prisma.$disconnect()
    }
}

export{
    dbUpdateStatusService
}