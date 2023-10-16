import * as message from "../../../modulo/config"
import { Token } from "../../../interfaceGlobal/token"
import { dbGetServiceByID } from "../../../model/clienteDAO/getServiceClientById"
import * as jwt from "jsonwebtoken"

const getAllServiceClientById = async function(token: string, status: any){

    const SECRETE = message.REQUIRE_SECRETE

    const statusService = Number(status)


    if(isNaN(statusService) && statusService > 5 || statusService < 1){
        return {
            status: 422,
            message: {status: 422, message: "Atenção o id para filtro do tipo de serviço está inválido"}
        }
    }

    try {
        
        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE) as Token
        const { id, name } = decoded

        const service = await dbGetServiceByID(Number(id), statusService)
        if(service){
            return {
                status: 201,
                data: service
            }
        }else {
            return message.ERRO_INTERNAL_SERVER
        }
        
    } catch (error) {
        return message.ERRO_INTERNAL_SERVER
    }
}

export {
    getAllServiceClientById
}