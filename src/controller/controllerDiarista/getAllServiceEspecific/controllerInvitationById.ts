import * as message from "../../../modulo/config"
import {Token} from "../../../interfaceGlobal/token"
import { dbGetInvitation } from "../../../model/diaristaDAO/getInvitationById"
import * as jwt from "jsonwebtoken"

const getInvitationById = async function (token: string, statusService: any) {

    const SECRETE = message.REQUIRE_SECRETE

    const statusTypeService = Number(statusService)

    if(!isNaN(statusTypeService) && statusTypeService > 5 || statusTypeService < 1){
        return {
            status: 422,
            message: {status: 422, message: "Atenção o id para filtro do tipo de serviço está inválido"}
        }
    }

    try {
        
        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE) as Token
        const { id } = decoded
        
        let invitation
        const statusInvitation = await dbGetInvitation(Number(id), statusTypeService)
        if(statusInvitation){
            invitation = {
                status: 200,
                data: statusInvitation
            }
        }else{

            invitation = {
                status: 404,
                data: {status: 404, message: "Nenhum serviço vinculado ao diarista encontrado"}
            }
        }

        return invitation

    } catch (error) {
        return message.ERRO_INTERNAL_SERVER
    }
}

export{
    getInvitationById
}