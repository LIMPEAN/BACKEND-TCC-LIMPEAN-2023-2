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
exports.loginTypeUser = void 0;
const message = __importStar(require("../../../modulo/config"));
const controllerLogin_1 = require("../../controllerDiarista/loginDiarista/controllerLogin");
const controllerLogin_2 = require("../../controllerCliente/loginCliente/controllerLogin");
const loginTypeUser = async function (login) {
    let statusLogin;
    if (typeof login.typeUser !== "string" || (login.typeUser.toLocaleLowerCase() !== "diarist" && login.typeUser.toLocaleLowerCase() !== "client")) {
        statusLogin = message.ERRO_INVALID_TYPE_USER;
    }
    else {
        if (login.typeUser.toLowerCase() === "diarist") {
            statusLogin = await (0, controllerLogin_1.loginDiarist)(login);
        }
        else if (login.typeUser.toLowerCase() === "client") {
            statusLogin = await (0, controllerLogin_2.loginClient)(login);
        }
    }
    return statusLogin;
};
exports.loginTypeUser = loginTypeUser;
