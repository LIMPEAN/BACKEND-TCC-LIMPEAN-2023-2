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
exports.updateDataClient = void 0;
const message = __importStar(require("../../../modulo/config"));
const db = __importStar(require("../../../model/clienteDAO/updateDateClientById"));
const dataPersonalSimple_1 = require("./createDataStructure/dataPersonalSimple");
const dataPersonalPhone_1 = require("./createDataStructure/dataPersonalPhone");
const validateDataUpdateClient_1 = require("./validate/validateDataUpdateClient");
const jwt = __importStar(require("jsonwebtoken"));
const updateDataClient = async function (token, dataClient) {
    const SECRETE = message.REQUIRE_SECRETE;
    try {
        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE);
        const { id, name } = decoded;
        const tokenDecoded = { id, name };
        let stutusCheck = await (0, validateDataUpdateClient_1.checkDataClient)(dataClient, tokenDecoded);
        if (!stutusCheck) {
            return message.ERRO_UPDATE_USER;
        }
        else {
            const simpleData = (0, dataPersonalSimple_1.createStructureSimpleDataPersonal)(dataClient);
            if (simpleData) {
                const updateDataSimple = await db.updateDataSimpleClient(tokenDecoded, simpleData);
                if (!updateDataSimple) {
                    return message.ERRO_UPDATE_DATA_SIMPLE_DIARIST;
                }
            }
            const dataPhone = (0, dataPersonalPhone_1.createStructureSimpleDataPhone)(dataClient.phones);
            if (dataPhone) {
                const updateNumberPhone = await db.updateDataPhone(tokenDecoded, dataPhone);
                if (!updateNumberPhone) {
                    return message.ERRO_UPDATE_PHONE_USER;
                }
            }
            return message.UPDATE_USER;
        }
    }
    catch (error) {
        return message.ERRO_INTERNAL_SERVER;
    }
};
exports.updateDataClient = updateDataClient;
