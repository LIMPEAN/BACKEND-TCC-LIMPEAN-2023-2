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
exports.getStatusTokenClient = void 0;
const message = __importStar(require("../../../modulo/config"));
const jwt = __importStar(require("jsonwebtoken"));
const getStatusTokenClient_1 = require("../../../model/clienteDAO/getStatusTokenClient");
const getStatusTokenClient = async function (tokenClient, idService, tokenService) {
    const SECRETE = message.REQUIRE_SECRETE;
    if (!Number(idService)) {
        return {
            status: 422,
            message: "O token do serviço deve ser um número"
        };
    }
    else if (tokenClient === null || tokenClient.length < 6) {
        return {
            status: 422,
            message: "Informe o token do serviço"
        };
    }
    try {
        const decoded = jwt.verify(tokenClient, SECRETE);
        const { id, name } = decoded;
        const statusTokenService = await (0, getStatusTokenClient_1.dbVerifyTokenService)(Number(id), Number(idService), tokenService);
        if (typeof statusTokenService === "number" && statusTokenService === 500) {
            return message.ERRO_INTERNAL_SERVER;
        }
        else if (statusTokenService) {
            return {
                status: 201,
                message: "Token verificado com sucesso."
            };
        }
        else {
            return {
                status: 401,
                message: "Dados incorretos, verifique as informações do cliente e do diarista e tente novamente."
            };
        }
    }
    catch (error) {
        return message.ERRO_INTERNAL_SERVER;
    }
};
exports.getStatusTokenClient = getStatusTokenClient;
