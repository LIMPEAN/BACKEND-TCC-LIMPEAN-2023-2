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
exports.getInvitationById = void 0;
const message = __importStar(require("../../../modulo/config"));
const getInvitationById_1 = require("../../../model/diaristaDAO/getInvitationById");
const jwt = __importStar(require("jsonwebtoken"));
const getInvitationById = async function (token, statusService) {
    const SECRETE = message.REQUIRE_SECRETE;
    const statusTypeService = Number(statusService);
    if (!isNaN(statusTypeService) && statusTypeService > 5 || statusTypeService < 1) {
        return {
            status: 422,
            message: { status: 422, message: "Atenção o id para filtro do tipo de serviço está inválido" }
        };
    }
    try {
        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE);
        const { id } = decoded;
        let invitation;
        const statusInvitation = await (0, getInvitationById_1.dbGetInvitation)(Number(id), statusTypeService);
        if (statusInvitation) {
            invitation = {
                status: 200,
                data: statusInvitation
            };
        }
        else {
            invitation = {
                status: 404,
                data: { status: 404, message: "Nenhum serviço vinculado ao diarista encontrado" }
            };
        }
        return invitation;
    }
    catch (error) {
        return message.ERRO_INTERNAL_SERVER;
    }
};
exports.getInvitationById = getInvitationById;
