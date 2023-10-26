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
exports.getDataAllServiceOpen = void 0;
const message = __importStar(require("../../../modulo/config"));
const getServiceOpen_1 = require("../../../model/clienteDAO/getServiceOpen");
const getDataAllServiceOpen = async function () {
    try {
        let statusServiceOPen;
        const statusService = await (0, getServiceOpen_1.getServiceOpen)();
        if (statusService) {
            statusServiceOPen = {
                status: 200,
                data: statusService
            };
        }
        else {
            statusServiceOPen = {
                status: 404,
                data: { status: 404, message: "Nenhum registro encontrado." }
            };
        }
        return statusServiceOPen;
    }
    catch (error) {
        return message.ERRO_INTERNAL_SERVER;
    }
};
exports.getDataAllServiceOpen = getDataAllServiceOpen;
