"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCliente = void 0;
const message = __importStar(require("../../../modulo/config"));
const validate = __importStar(require("./validate/validateRegister"));
const db = __importStar(require("../../../model/clienteDAO/registerCliente"));
const registerCliente = async function (body) {
    let statusRegisterCliente;
    if (!validate.validateTypesJson(body)) {
        statusRegisterCliente = message.ERRO_REQUIRED_DATA_CLIENTE;
    }
    else if (body.password.length < 6 || body.nameUser === "" || body.photoUser === "") {
        statusRegisterCliente = message.ERRO_NAME_PHOTO_PASSWORD;
    }
    else if (body.ddd.length != 2 || !validate.validatePhoneWithDDD(body.ddd, body.phone)) {
        statusRegisterCliente = message.ERRO_NUMBER_PHONE;
    }
    else if (!validate.validateEmail(body.email)) {
        statusRegisterCliente = message.ERRO_REGISTER_EMAIL;
    }
    else if (!validate.validateDateBirth(body.birthDate)) {
        statusRegisterCliente = message.ERRO_REQUIRE_BIRTH_DATE;
    }
    else if (!validate.validateCPF(body.cpf)) {
        statusRegisterCliente = message.ERRO_REQUIRE_CPF;
    }
    else if (!validate.validadeAddress(body.address)) {
        statusRegisterCliente = message.ERRO_ADDRESS;
    }
    else {
        let status = await db.registerUser(body);
        if (status) {
            statusRegisterCliente = message.CREATED_REGISTER;
        }
        else {
            statusRegisterCliente = message.ERRO_REGISTER_USER;
        }
    }
    return statusRegisterCliente;
};
exports.registerCliente = registerCliente;
