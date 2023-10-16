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
exports.updateDataAddressClient = void 0;
const message = __importStar(require("../../../modulo/config"));
const db = __importStar(require("../../../model/clienteDAO/updateDateClientById"));
const dataPersonalAddress_1 = require("./createDataStructure/dataPersonalAddress");
const jwt = __importStar(require("jsonwebtoken"));
const updateDataAddressClient = async function (token, residenciaId, data) {
    const SECRETE = message.REQUIRE_SECRETE;
    try {
        if (!Number(residenciaId)) {
            return {
                status: 422,
                message: "O id do endereço deve ser um número."
            };
        }
        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE);
        const { id, name } = decoded;
        const tokenDecoded = { id, name };
        if (data.typeHouse == null && data.state == null && data.city == null && data.cep == null && data.publicPlace == null && data.complement == null && data.district == null && data.houseNumber == null) {
            return message.ERRO_REQUIRED_DATA_CLIENTE;
        }
        const addressData = (0, dataPersonalAddress_1.createStructureSimpleDataAddress)(data);
        if (addressData) {
            const updateAddress = await db.updateDataAddressClient(tokenDecoded, Number(residenciaId), addressData);
            if (!updateAddress) {
                return message.ERRO_UPDATE_ADDRESS_CLIENT;
            }
        }
        return message.UPDATE_USER;
    }
    catch (error) {
        return message.ERRO_INTERNAL_SERVER;
    }
};
exports.updateDataAddressClient = updateDataAddressClient;
