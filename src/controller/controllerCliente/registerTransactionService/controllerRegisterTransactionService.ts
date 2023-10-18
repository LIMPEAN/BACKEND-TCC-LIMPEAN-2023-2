import * as message from "../../../modulo/config"
import { Token } from "../../../interfaceGlobal/token"
import { RegisterTransaction } from "./interface/transaction"
import { validateTypesJson } from "./validate/validateRegisterTransaction"
import { dbRegisterTransactionService } from "../../../model/clienteDAO/registerTransactionClientById"
import * as jwt from "jsonwebtoken"

const registerTransaction = async function (token: string, data: RegisterTransaction){

    const SECRETE = message.REQUIRE_SECRETE

    if(!validateTypesJson(data)){
        return message.ERRO_REQUIRED_DATA_CLIENTE
    }else if(data.typeTransactionId > 4 || data.typeTransactionId < 1){
        return {
            status: 422,
            message: "Inválido o id do tipo de transação. Obs: Ele deve estar entre 1 a 4."
        }
    }

    try {

        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE) as Token
        const { id, name } = decoded

        let decodedToken: Token = { 
            id: id,
            name: name
        }  
        
        const statusTransaction = await dbRegisterTransactionService(decodedToken, data)
        
        if(typeof statusTransaction === "number" && statusTransaction === 404){
            return {
                status: 422,
                message: "Erro, verique se o id do serviço pertence ao cliente e tente novamente."
            }
        }else if(typeof statusTransaction === "boolean" && statusTransaction === true){
            return {
                status: 201,
                message: "Registro salvo com sucesso"
            }
        }else{
            return {
                status: 422,
                message: "Atenção verifique os dados e tente novamente. Obs: Será possivel cadastrar apenas 1 comprovante por serviço."
            }
        }

    } catch (error) {
        return message.ERRO_INTERNAL_SERVER
    }

}

export {
    registerTransaction
}