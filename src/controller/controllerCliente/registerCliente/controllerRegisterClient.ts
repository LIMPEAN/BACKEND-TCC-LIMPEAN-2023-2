import * as message from "../../../modulo/config"
import * as validate from "./validate/validateRegister"
import * as db from "../../../model/clienteDAO/registerCliente"

interface Cliente {
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
    address: {
        typeHouse: number,          // Tipo de casa
        state: number,              // Estado
        city: string,               // Cidade
        cep: string,                // CEP
        publicPlace: string,        // Logradouro
        complement: string | null,  // Complemento
        district: string,           // Bairro
        houseNumber: string         // Numero da casa
    }
}

const registerCliente = async function (body: Cliente) {

    let statusRegisterCliente

    if (
        !validate.validateTypesJson(body)
    ) {
        statusRegisterCliente = message.ERRO_REQUIRED_DATA_CLIENTE
    } else if (body.password.length < 6 || body.nameUser === "" || body.photoUser === "") {
        statusRegisterCliente = message.ERRO_NAME_PHOTO_PASSWORD
    } else if (body.ddd.length != 2 || !validate.validatePhoneWithDDD(body.ddd, body.phone)) {
        statusRegisterCliente = message.ERRO_NUMBER_PHONE
    } else if (!validate.validateEmail(body.email)) {
        statusRegisterCliente = message.ERRO_REGISTER_EMAIL
    } else if (!validate.validateDateBirth(body.birthDate)) {
        statusRegisterCliente = message.ERRO_REQUIRE_BIRTH_DATE
    } else if (!validate.validateCPF(body.cpf)) {
        statusRegisterCliente = message.ERRO_REQUIRE_CPF
    } else if (!validate.validadeAddress(body.address)) {
        statusRegisterCliente = message.ERRO_ADDRESS
    } else {

        let status = await db.registerUser(body)

        if (status) {

            statusRegisterCliente = {
                status: 201,
                message: "Registro criado com sucesso",
                clientId: status
            }

        } else {

            statusRegisterCliente = message.ERRO_REGISTER_USER
        }
    }

    return statusRegisterCliente
}

// const deleteRegisterCliente = async function (body: Cliente) {
//     let statusDeleteCliente

//     if (typeof body.id != "number" || !validate.validateEmail(body.email)) {
//         statusDeleteCliente = message.ERRO_DELETE_USER
//     } else {

//         let status = await cliente.deleteRegisterCliente(body)

//         if (status) {

//             statusDeleteCliente = message.DELETE_CLIENTE
//         } else {
//             statusDeleteCliente = message.ERRO_DELETE_USER
//         }

//     }

//     return statusDeleteCliente
// }


export {
    registerCliente
}