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
exports.updateStatusService = void 0;
const message = __importStar(require("../../../modulo/config"));
const updateStatusServiceDiaristWithClient_1 = require("../../../model/diaristaDAO/updateStatusServiceDiaristWithClient");
const jwt = __importStar(require("jsonwebtoken"));
const updateStatusService = async function (data) {
    const SECRETE = message.REQUIRE_SECRETE;
    if (!Number(data.idService) || !Number(data.idStatus) || Number(data.idStatus) == 1) {
        return {
            status: 422,
            message: { status: 422, messsage: "Erro nos tipos de dados requeridos", obs: "O idService e o idstatus devem ser um número." }
        };
    }
    try {
        let statusService;
        const decoded = jwt.verify(Array.isArray(data.token) ? data.token[0] : data.token, SECRETE);
        const { id, name } = decoded;
        const statusSchedule = await (0, updateStatusServiceDiaristWithClient_1.dbUpdateServiceDiarist)(Number(id), Number(data.idService), Number(data.idStatus));
        if (statusSchedule) {
            statusService = {
                status: 201,
                message: { status: 201, message: "Status do serviço atualizado com sucesso." }
            };
        }
        else {
            statusService = {
                status: 500,
                message: { status: 500, message: "Erro ao tentar atualizar os status do serviço. Verifique os dados e tente novamente." }
            };
        }
        return statusService;
    }
    catch (error) {
        return message.ERRO_INTERNAL_SERVER;
    }
};
exports.updateStatusService = updateStatusService;
