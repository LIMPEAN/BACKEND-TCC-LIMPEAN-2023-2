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
exports.registerAddressCliente = void 0;
const message = __importStar(require("../../../modulo/config"));
const validate = __importStar(require("./validate/validateRegisterAddress"));
const db = __importStar(require("../../../model/clienteDAO/registerAddressCliente"));
const jwt = __importStar(require("jsonwebtoken"));
const registerAddressCliente = async function (body, token) {
    let statusRegisterAddress;
    const SECRETE = message.REQUIRE_SECRETE;
    try {
        const decoded = jwt.verify(token, SECRETE);
        const { id, name } = decoded;
        const tokenDecoded = { id, name };
        if (!validate.validateTypesJson(body)) {
            statusRegisterAddress = message.ERRO_REQUIRED_DATA_CLIENTE;
        }
        else if (!validate.validateAddress(body)) {
            statusRegisterAddress = message.ERRO_ADDRESS;
        }
        else {
            let status = await db.registerAddressUser(body, tokenDecoded);
            if (status) {
                statusRegisterAddress = message.CREATED_REGISTER;
            }
            else {
                statusRegisterAddress = message.ERRO_REGISTER_USER;
            }
        }
        return statusRegisterAddress;
    }
    catch (error) {
        console.log(error);
        return message.ERRO_INTERNAL_SERVER;
    }
};
exports.registerAddressCliente = registerAddressCliente;
