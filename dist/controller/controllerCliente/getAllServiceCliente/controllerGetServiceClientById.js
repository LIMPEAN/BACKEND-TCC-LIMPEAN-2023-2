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
exports.getAllServiceClientById = void 0;
const message = __importStar(require("../../../modulo/config"));
const getServiceClientById_1 = require("../../../model/clienteDAO/getServiceClientById");
const jwt = __importStar(require("jsonwebtoken"));
const getAllServiceClientById = async function (token, status) {
    const SECRETE = message.REQUIRE_SECRETE;
    const statusService = Number(status);
    if (isNaN(statusService) && statusService > 5 || statusService < 1) {
        return {
            status: 422,
            message: { status: 422, message: "Atenção o id para filtro do tipo de serviço está inválido" }
        };
    }
    try {
        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE);
        const { id, name } = decoded;
        const service = await (0, getServiceClientById_1.dbGetServiceByID)(Number(id), statusService);
        if (service) {
            return {
                status: 201,
                data: service
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
exports.getAllServiceClientById = getAllServiceClientById;
