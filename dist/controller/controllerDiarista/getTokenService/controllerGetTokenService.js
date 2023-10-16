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
exports.getTokenService = void 0;
const message = __importStar(require("../../../modulo/config"));
const getTokenServiceDiarist_1 = require("../../../model/diaristaDAO/getTokenServiceDiarist");
const jwt = __importStar(require("jsonwebtoken"));
const getTokenService = async function (token, idServiceClient) {
    const SECRETE = message.REQUIRE_SECRETE;
    const idService = Number(idServiceClient);
    if (isNaN(idService)) {
        return {
            status: 500,
            message: { status: 500, message: "Atenção o id do serviço deve ser um número" }
        };
    }
    try {
        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE);
        const { id, name } = decoded;
        const statusToken = await (0, getTokenServiceDiarist_1.dbGetTokenServiceDiarist)(Number(id), name, idService);
        if (statusToken === 404) {
            return {
                status: 201,
                data: {
                    status: 404,
                    message: "Dados do serviço invalidos, verique se o diarista está vinculado ao serviço e tente novamente. Obs: Verique se o serviço não foi cancelado."
                }
            };
        }
        else if (statusToken) {
            return {
                status: 201,
                token: statusToken
            };
        }
        else {
            return message.ERRO_INTERNAL_SERVER;
        }
    }
    catch (error) {
        return message.ERRO_INTERNAL_SERVER;
    }
};
exports.getTokenService = getTokenService;
