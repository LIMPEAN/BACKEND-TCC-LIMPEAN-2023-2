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
exports.updateStatusServiceClient = void 0;
const message = __importStar(require("../../../modulo/config"));
const jwt = __importStar(require("jsonwebtoken"));
const validate = __importStar(require("./validate/validateService"));
const updateStatusServiceClientById_1 = require("../../../model/clienteDAO/updateStatusServiceClientById");
const updateStatusServiceClient = async (token, data) => {
    const SECRETE = message.REQUIRE_SECRETE;
    if (typeof data.idService !== 'number' || typeof data.idStatus !== 'number' || data.idService < 1 || data.idService > 5) {
        return {
            status: 422,
            message: "Atenção, o id do serviço e o id do status devem ser um número"
        };
    }
    else if (!validate.validateDate(data.date) && !validate.validateHour(data.hour)) {
        return {
            status: 422,
            message: "Data ou hora no formato inválido. Ex: YYYY-MM-DD ou YYYY/MM/DD ou Ex: 12:00"
        };
    }
    else {
        try {
            const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE);
            const { id, name } = decoded;
            let decodedToken = {
                id: id,
                name: name
            };
            const statusService = await (0, updateStatusServiceClientById_1.dbUpdateStatusService)(decodedToken, data);
            if (typeof statusService === "number" && statusService === 404) {
                return {
                    status: 422,
                    message: "Verifique os dados e tente novamente."
                };
            }
            else if (statusService) {
                return {
                    status: 201,
                    message: "Registro criado com sucesso."
                };
            }
            else {
                return message.ERRO_INTERNAL_SERVER;
            }
        }
        catch (error) {
            return message.ERRO_INTERNAL_SERVER;
        }
    }
};
exports.updateStatusServiceClient = updateStatusServiceClient;
