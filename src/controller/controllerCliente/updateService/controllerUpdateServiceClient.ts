import * as message from "../../../modulo/config"
import { UpdateService } from "./interface/updateService"
import { Token } from "../../../interfaceGlobal/token"
import * as validate from "./validate/validateService"
import { dbUpdateService } from "../../../model/clienteDAO/updateServiceClientById"
import * as jwt from "jsonwebtoken"

const updateRegisterService = async function(token: string, data: UpdateService){

    const SECRETE = message.REQUIRE_SECRETE

    if(!validate.validateTypesJson){
        return message.ERRO_REQUIRED_DATA_CLIENTE
    }else if(!validate.validateValueMonetary(data.newValue)){
        return  {
            status: 422,
            message: "Valor monetario no formato inválido. Ex: 100.00 ou 100,00"
        }
    }

    try {

        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE) as Token
        const { id, name } = decoded

        let decodedToken: Token = { 
            id: id,
            name: name
        }

        const statusService = await dbUpdateService(decodedToken, data)
        if(typeof statusService === "number" && statusService === 404){
            return {
                status: 422,
                message: "Erro, verifique se o serviço pertense ao cliente. Obs: Somente será possivel atualizar serviços com status em aberto."
            }
        }else if(typeof statusService === "boolean" && statusService){            
            return message.UPDATE_USER
        }else{
            return message.ERRO_INTERNAL_SERVER
        }
        
    } catch (error) {
        return message.ERRO_INTERNAL_SERVER
    }
}

export {
    updateRegisterService
}