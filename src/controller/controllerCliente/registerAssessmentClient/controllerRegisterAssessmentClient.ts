import * as message from "../../../modulo/config"
import { Token } from "../../../interfaceGlobal/token"
import { Assessement } from "../../controllerUser/assessment/interface/assessment"
import { dbRegisterAssessmentClient } from "../../../model/clienteDAO/registerAssessmentClientById"
import * as jwt from "jsonwebtoken"

const registerAssessmentClient = async function(token: string, data: Assessement)  {

    const SECRETE = message.REQUIRE_SECRETE

    try {
        const decoded = jwt.verify(token, SECRETE) as Token
        const { id, name } = decoded

        const tokenDecoded = { id, name }

        const statusAssessementClient = await dbRegisterAssessmentClient(tokenDecoded, data) 
        if(statusAssessementClient === 404){
            return {
                status: 404,
                message: "Erro verifique se o diarista ou cliente existe e tente novamente. Obs: Não é permitido cadastrar duas vezes a mesma avaliação."
            }
        }else if(statusAssessementClient){
            return {
                status: 201,
                message: message.CREATED_REGISTER
            }
        }else{
            return message.ERRO_INTERNAL_SERVER
        }

    } catch (error) {
        return message.ERRO_INTERNAL_SERVER
    }
}

export{
    registerAssessmentClient
}