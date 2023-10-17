import * as message from "../../../modulo/config"
import { Assessement } from "./interface/assessment"
import {registerAssessmentClient} from "../../controllerCliente/registerAssessmentClient/controllerRegisterAssessmentClient"
import { registerAssessmentDiarist } from "../../controllerDiarista/registerAssementDiarist/controllerRegisterAssessmentDiarist";

function validateHour(data: string) {
    const regexHora = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
      if (regexHora.test(data)) {      
      return true
    } else {
      return false
    }
}

const validateDate = (data: string) => {
    let status = true
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/    
    const dateRegexBar = /^\d{4}\/\d{2}\/\d{2}$/
    if (!data.match(dateRegex) && !data.match(dateRegexBar)) {
        return false
    }
    return status
}

const assessmentTypeUser = async function(token: string, data: Assessement){
    let statusAssessment
    
    if(typeof data.typeUser !== "string" || (data.typeUser.toLowerCase() !== "diarist" && data.typeUser.toLowerCase() !== "client")) {        
        statusAssessment = message.ERRO_INVALID_TYPE_USER
    }else if(typeof data.personEvaluatedId !== "number" || typeof data.star !== "number" || typeof data.comment !== "string"){
        statusAssessment = message.ERRO_REQUIRED_DATA_CLIENTE
    }else if(!validateDate(data.date) || !validateHour(data.hour)){
        statusAssessment = {
            status: 422,
            message: "Data ou Hora no forma inválido. Ex: Data: YYYY-MM-DD, Hora: 12:00"
        }
    }else if(data.star > 5 || data.star < 1 ){
        statusAssessment = {
            status: 422,
            message: "Erro, o número minimo de estrelas é 1 e o máximo 5"
        }
    }
    else{
        if(data.typeUser.toLowerCase() === "client"){
            statusAssessment = await registerAssessmentClient(token, data)
            
        }else if(data.typeUser.toLowerCase() === "diarist"){
            statusAssessment = await registerAssessmentDiarist(token, data)
        }else{
            statusAssessment = {
                status: 422,
                message: "Erro, verifique os dados e tente novamente."
            }
        }
    }

    return statusAssessment
}

export{
    assessmentTypeUser
}