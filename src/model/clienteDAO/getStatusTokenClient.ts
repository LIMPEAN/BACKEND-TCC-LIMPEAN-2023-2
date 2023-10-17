import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const dbVerifyTokenService = async function(idClient: number, idService: number, token: string){

    try {        
        const serviceClient = await prisma.tbl_servico.findFirst({
            where: {
                id: idService
            },select: {
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
        })    
        
        if(
             serviceClient && serviceClient.FK_ResidenciaCliente_Servico.id_cliente === idClient &&
             serviceClient.FK_TokenServico_Servico.codigo === token
            ){
                return true
        }else{
            return false
        }

    } catch (error) {
        return 500
    }
}

export {
    dbVerifyTokenService
}