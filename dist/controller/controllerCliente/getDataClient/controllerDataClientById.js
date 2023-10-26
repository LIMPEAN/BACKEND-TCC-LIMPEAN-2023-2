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
exports.getDataClient = void 0;
const getDataRegisterClientById_1 = require("../../../model/clienteDAO/getDataRegisterClientById");
const message = __importStar(require("../../../modulo/config"));
const jwt = __importStar(require("jsonwebtoken"));
const getDataClient = async function (token) {
    const SECRETE = message.REQUIRE_SECRETE;
    try {
        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE);
        const { id, name } = decoded;
        const client = await (0, getDataRegisterClientById_1.getDataRegisterClientById)(Number(id), name);
        if (client) {
            return {
                status: 200,
                data: client[0].client
            };
        }
        else {
            return message.ERRO_INVALID_TOKEN;
        }
    }
    catch (error) {
        return message.ERRO_INTERNAL_SERVER;
    }
};
exports.getDataClient = getDataClient;
