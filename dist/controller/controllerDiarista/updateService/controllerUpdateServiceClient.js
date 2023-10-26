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
exports.updatePriceServiceDiarist = void 0;
const message = __importStar(require("../../../modulo/config"));
const validate = __importStar(require("./validate/validateService"));
const updateServiceDiaristById_1 = require("../../../model/diaristaDAO/updateServiceDiaristById");
const jwt = __importStar(require("jsonwebtoken"));
const updatePriceServiceDiarist = async function (token, data) {
    const SECRETE = message.REQUIRE_SECRETE;
    if (!validate.validateTypesJson) {
        return message.ERRO_REQUIRED_DATA_CLIENTE;
    }
    else if (!validate.validateValueMonetary(data.newValue)) {
        return {
            status: 422,
            message: "Valor monetario no formato inválido. Ex: 100.00 ou 100,00"
        };
    }
    try {
        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE);
        const { id, name } = decoded;
        let decodedToken = {
            id: id,
            name: name
        };
        const statusService = await (0, updateServiceDiaristById_1.dbUpdateService)(decodedToken, data);
        if (typeof statusService === "number" && statusService === 404) {
            return {
                status: 422,
                message: "Erro, verifique se o serviço está vinculado ao diarista. Obs: Somente será possivel atualizar serviços com status em aberto."
            };
        }
        else if (typeof statusService === "boolean" && statusService) {
            return message.UPDATE_USER;
        }
        else {
            return message.ERRO_INTERNAL_SERVER;
        }
    }
    catch (error) {
        return message.ERRO_INTERNAL_SERVER;
    }
};
exports.updatePriceServiceDiarist = updatePriceServiceDiarist;
