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
exports.loginDiarist = void 0;
const db = __importStar(require("../../../model/diaristaDAO/loginDiarista"));
const jwt = __importStar(require("../../../middleware/controllerJWT"));
const message = __importStar(require("../../../modulo/config"));
const loginDiarist = async function (body) {
    if (body.email === "" || body.email == null ||
        body.password === "" || body.password == null) {
        return message.ERRO_INVALID_USER;
    }
    else {
        try {
            const dataUser = await db.loginDiarista(body);
            if (typeof dataUser === "number") {
                return message.ERRO_INVALID_LOGIN_USER;
            }
            else if (dataUser && typeof dataUser !== "number") {
                const token = jwt.createJWT(dataUser);
                let statusJson = {
                    status: 200,
                    id: dataUser.id,
                    email: dataUser.email,
                    token: token
                };
                return statusJson;
            }
            else {
                return message.ERRO_INVALID_USER;
            }
        }
        catch (error) {
            return message.ERRO_INTERNAL_SERVER;
        }
    }
};
exports.loginDiarist = loginDiarist;
