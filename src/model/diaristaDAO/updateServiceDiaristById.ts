import { Token } from "../../interfaceGlobal/token"
import { UpdateService } from "../../controller/controllerDiarista/updateService/interface/updateService"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const dbUpdateService = async function (token: Token, data: UpdateService) {
    try {

        const verifyServiceAndDiarist = await prisma.tbl_diarista_servico.findFirst({
            where: {
                id_servico: data.idService,
                id_diarista: Number(token.id)
            }
        })


        if (verifyServiceAndDiarist) {
            await prisma.tbl_servico_com_valor.updateMany({
                where: {
                    id_servico: data.idService
                },
                data: {
                    valor: data.newValue
                }
            })
        } else {
            return 404
        }
        return true
        
    } catch (error) {
        return false
    } finally {
        await prisma.$disconnect()
    }
}

export {
    dbUpdateService
}