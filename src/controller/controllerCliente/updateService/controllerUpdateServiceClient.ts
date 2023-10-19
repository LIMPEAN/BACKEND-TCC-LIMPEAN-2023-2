import * as message from "../../../modulo/config"
import { UpdateService } from "./interface/updateService"
import { Token } from "../../../interfaceGlobal/token"
import * as validate from "./validate/validateService"
import * as jwt from "jsonwebtoken"

const updateRegisterService = async function(token: string, data: UpdateService){

    const SECRETE = message.REQUIRE_SECRETE

    let statusService

    if(!validate.validateTypesJson){
        statusService = message.ERRO_REQUIRED_DATA_CLIENTE
    }else if(!validate.validateValueMonetary(data.newValue)){
        statusService = {
            status: 422,
            message: "Valor monetario no formato inválido. Ex: 100.00 ou 100,00"
        }
    }else {

        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE) as Token
        const { id, name } = decoded

        let decodedToken: Token = { 
            id: id,
            name: name
        }

        console.log(decodedToken);
        
    }
}