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
        
        console.log(verifyServiceAndClient);
        

        if(verifyServiceAndClient.length > 0 && verifyServiceAndClient.every(
            it => it.FK_Servico_StatusServico.FK_ResidenciaCliente_Servico.FK_Cliente_Residencia.email === token.name) &&
            verifyServiceAndClient.every(it => it.FK_Servico_StatusServico.FK_ResidenciaCliente_Servico.FK_Cliente_Residencia.id) &&
            verifyServiceAndClient.every(it => it.id_status === 1)
            ){                
                
                console.log("log");
                
                await prisma.tbl_servico_com_valor.updateMany({
                    where: {
                        id_servico: data.idService
                    },
                    data:{
                        valor: data.newValue
                    }
                })  

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

export {
    dbUpdateService
}