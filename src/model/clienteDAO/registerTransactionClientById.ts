import { RegisterTransaction } from "../../controller/controllerCliente/registerTransactionService/interface/transaction"
import { Token } from "../../interfaceGlobal/token"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const dbRegisterTransactionService = async function (token: Token, data: RegisterTransaction){

    const verifyService = await prisma.tbl_servico.findFirst({
        where: {
            id: data.serviceId
        }, select: {
            id: true,
            FK_ResidenciaCliente_Servico: {
                select: {
                    FK_Cliente_Residencia: {
                        select: {
                            id: true,
                            email: true
                        }
                    }
                }
            }
        }
    })    

    if(
        verifyService && verifyService.FK_ResidenciaCliente_Servico.FK_Cliente_Residencia.id === Number(token.id) && 
        verifyService.FK_ResidenciaCliente_Servico.FK_Cliente_Residencia.email === token.name
    ){
        const verifyTransaction = await prisma.tbl_transacao.findFirst({
            where: {
                id_servico: verifyService.id
            }
        })

        if(!verifyTransaction){

            await prisma.tbl_transacao.create({
                data: {
                    valor: data.value,
                    id_servico: verifyService.id,
                    id_tipo_trasacao: data.typeTransactionId,
                    comprovante: data.receipt
                }
            })
            
            return true
        }else {
            return false
        }
    }else{
        return 404
    }
}

export{
    dbRegisterTransactionService
}