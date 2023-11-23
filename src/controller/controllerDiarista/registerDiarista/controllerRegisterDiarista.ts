import * as message from "../../../modulo/config"
import * as validate from "./validate/validateRegister"
import * as db from "../../../model/diaristaDAO/registerDiarista"

interface Diarista {
    typeUser: string,
    email: string,
    password: string,
    nameUser: string,
    photoUser: string,
    phone: string,
    ddd: string,
    birthDate: string,
    idGender: number,
    cpf: string,
    biography: string | null,
    averagePrice: string,
    address: {
        state: number,              // Estado
        city: string,               // Cidade
        cep: string,                // CEP
        publicPlace: string,        // Logradouro
        complement: string | null,  // Complemento
        district: string,           // Bairro
        houseNumber: string         // Numero da casa
    }
}

const registerDiarista = async function (body: Diarista) {

    let statusRegisterDiarista

    if (
        !validate.validateTypesJson(body)
    ) {
        statusRegisterDiarista = message.ERRO_REQUIRED_DATA_CLIENTE
    } else if (body.password.length < 6 || body.nameUser === "" || body.photoUser === "") {
        statusRegisterDiarista = message.ERRO_NAME_PHOTO_PASSWORD
    } else if (body.ddd.length != 2 || !validate.validatePhoneWithDDD(body.ddd, body.phone)) {
        statusRegisterDiarista = message.ERRO_NUMBER_PHONE
    } else if (!validate.validateEmail(body.email)) {
        statusRegisterDiarista = message.ERRO_REGISTER_EMAIL
    } else if (!validate.validateDateBirth(body.birthDate)) {
        statusRegisterDiarista = message.ERRO_REQUIRE_BIRTH_DATE
    } else if (!validate.validateCPF(body.cpf)) {
        statusRegisterDiarista = message.ERRO_REQUIRE_CPF
    } else if (!validate.validadeAddress(body.address)) {
        statusRegisterDiarista = message.ERRO_ADDRESS
    } else if(!validate.validateValueMonetary(body) && body.averagePrice !== null){
        statusRegisterDiarista = message.ERRO_REQUIRED_DATA_DIARISTA
    }  else {

        let status = await db.registerUser(body)

        if (status) {

            statusRegisterDiarista = {
                status: 201,
                message: "Registro criado com sucesso",
                diaristId: status
            }
            
        } else {

            statusRegisterDiarista = message.ERRO_REGISTER_USER
        }
    }

    return statusRegisterDiarista
}



export {
    registerDiarista
}