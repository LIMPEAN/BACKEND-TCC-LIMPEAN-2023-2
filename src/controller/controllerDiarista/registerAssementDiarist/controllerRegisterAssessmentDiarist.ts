import * as message from "../../../modulo/config"
import { Token } from "../../../interfaceGlobal/token"
import { Assessement } from "../../controllerUser/assessment/interface/assessment"
import { dbRegisterAssessmentDiarist } from "../../../model/diaristaDAO/registerAssessmentDiaristById"
import * as jwt from "jsonwebtoken"

const registerAssessmentDiarist = async function(token: string, data: Assessement)  {

    const SECRETE = message.REQUIRE_SECRETE

    try {
        const decoded = jwt.verify(token, SECRETE) as Token
        const { id, name } = decoded

        const tokenDecoded = { id, name }

        const statusAssessementClient = await dbRegisterAssessmentDiarist(tokenDecoded, data) 
        if(statusAssessementClient === 404){
            return {
                status: 404,
                message: "Erro verifique se o cliente ou diarista existe e tente novamente."
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
    registerAssessmentDiarist
}