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
exports.registerTransaction = void 0;
const message = __importStar(require("../../../modulo/config"));
const validateRegisterTransaction_1 = require("./validate/validateRegisterTransaction");
const registerTransactionClientById_1 = require("../../../model/clienteDAO/registerTransactionClientById");
const jwt = __importStar(require("jsonwebtoken"));
const registerTransaction = async function (token, data) {
    const SECRETE = message.REQUIRE_SECRETE;
    if (!(0, validateRegisterTransaction_1.validateTypesJson)(data)) {
        return message.ERRO_REQUIRED_DATA_CLIENTE;
    }
    else if (data.typeTransactionId > 4 || data.typeTransactionId < 1) {
        return {
            status: 422,
            message: "Inválido o id do tipo de transação. Obs: Ele deve estar entre 1 a 4."
        };
    }
    try {
        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE);
        const { id, name } = decoded;
        let decodedToken = {
            id: id,
            name: name
        };
        const statusTransaction = await (0, registerTransactionClientById_1.dbRegisterTransactionService)(decodedToken, data);
        if (typeof statusTransaction === "number" && statusTransaction === 404) {
            return {
                status: 422,
                message: "Erro, verique se o id do serviço pertence ao cliente e tente novamente."
            };
        }
        else if (typeof statusTransaction === "boolean" && statusTransaction === true) {
            return {
                status: 201,
                message: "Registro salvo com sucesso"
            };
        }
        else {
            return {
                status: 422,
                message: "Atenção verifique os dados e tente novamente. Obs: Será possivel cadastrar apenas 1 comprovante por serviço."
            };
        }
    }
    catch (error) {
        return message.ERRO_INTERNAL_SERVER;
    }
};
exports.registerTransaction = registerTransaction;
