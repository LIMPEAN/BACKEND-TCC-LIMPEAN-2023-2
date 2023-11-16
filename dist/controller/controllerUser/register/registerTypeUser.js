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
exports.registerTypeUser = void 0;
const message = __importStar(require("../../../modulo/config"));
const controllerRegisterDiarista_1 = require("../../controllerDiarista/registerDiarista/controllerRegisterDiarista");
const controllerRegisterClient_1 = require("../../controllerCliente/registerCliente/controllerRegisterClient");
const registerTypeUser = async function (user) {
    let statusRegister;
    if (typeof user.typeUser !== "string" || (user.typeUser.toLowerCase() !== "diarist" && user.typeUser.toLowerCase() !== "client")) {
        statusRegister = message.ERRO_INVALID_TYPE_USER;
    }
    else {
        if (user.typeUser.toLowerCase() === "diarist") {
            statusRegister = await (0, controllerRegisterDiarista_1.registerDiarista)(user);
        }
        else if (user.typeUser.toLowerCase() === "client") {
            statusRegister = await (0, controllerRegisterClient_1.registerCliente)(user);
        }
    }
    return statusRegister;
};
exports.registerTypeUser = registerTypeUser;
