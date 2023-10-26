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
exports.registerService = void 0;
const message = __importStar(require("../../../modulo/config"));
const validate = __importStar(require("./validate/validateService"));
const registerServiceClientById_1 = require("../../../model/clienteDAO/registerServiceClientById");
const jwt = __importStar(require("jsonwebtoken"));
const registerService = async function (token, data) {
    const SECRETE = message.REQUIRE_SECRETE;
    try {
        let statusRegister;
        if (!validate.validateDataService(data)) {
            statusRegister = message.ERRO_REQUIRED_DATA_CLIENTE;
        }
        else if (!validate.validateDate(data)) {
            statusRegister = {
                status: 422,
                message: "Data no formato inválido. Ex: YYYY-MM-DD ou YYYY/MM/DD"
            };
        }
        else if (!validate.validateHour(data)) {
            statusRegister = {
                status: 422,
                message: "Hora no formato inválido. Ex: 12:34"
            };
        }
        else if (!validate.validateValueMonetary(data) && data.value !== null) {
            statusRegister = {
                status: 422,
                message: "Valor monetario no formato inválido. Ex: 100.00 ou 100,00"
            };
        }
        else {
            const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE);
            const { id, name } = decoded;
            let decodedToken = {
                id: id,
                name: name
            };
            statusRegister = await (0, registerServiceClientById_1.dbRegisterService)(decodedToken, data);
            if (statusRegister) {
                return message.CREATED_REGISTER;
            }
            else {
                return message.ERRO_REGISTER_USER;
            }
        }
        return statusRegister;
    }
    catch (error) {
        return message.ERRO_INVALID_TOKEN;
    }
};
exports.registerService = registerService;
