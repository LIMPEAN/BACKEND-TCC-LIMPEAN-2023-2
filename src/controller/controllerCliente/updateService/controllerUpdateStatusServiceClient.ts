import * as message from "../../../modulo/config"
import * as jwt from "jsonwebtoken"
import * as validate from "./validate/validateService"
import { Token } from "../../../interfaceGlobal/token"
import { UpdateStatusService } from "./interface/updateStatusService"
import { dbUpdateStatusService } from "../../../model/clienteDAO/updateStatusServiceClientById"

const updateStatusServiceClient = async (token: string, data: UpdateStatusService) => {
    
    const SECRETE = message.REQUIRE_SECRETE
    
    if(typeof data.idService !== 'number' || typeof data.idStatus !== 'number' || data.idService < 1 || data.idService > 5){
        return  {
            status: 422,
            message: "Atenção, o id do serviço e o id do status devem ser um número"
        }
    }else if(!validate.validateDate(data.date) && !validate.validateHour(data.hour)){
        return {
            status: 422,
            message: "Data ou hora no formato inválido. Ex: YYYY-MM-DD ou YYYY/MM/DD ou Ex: 12:00"
        }
    }else{

        try {

        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE) as Token
        const { id, name } = decoded

        let decodedToken: Token = { 
            id: id,
            name: name
        }

        const statusService = await dbUpdateStatusService(decodedToken, data)
        if(typeof statusService === "number" && statusService === 404){
            return {
                status: 422,
                message: "Verifique os dados e tente novamente."
            }
        }else if(statusService){
            return {
                status: 201,
                message: "Registro criado com sucesso."
            }
        }else {
            return message.ERRO_INTERNAL_SERVER
        }
        } catch (error) {
            return message.ERRO_INTERNAL_SERVER
        }
    }
}

export{
    updateStatusServiceClient
}