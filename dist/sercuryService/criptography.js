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
exports.decripyAllData = exports.criptographyAllData = void 0;
const crypto = __importStar(require("crypto"));
const keyPrivateHex = "b5664aa242b3d57b145aff18314bba4514b4893632aba0f7f1fa5088bc640b31";
const keyPrivate = Buffer.from(keyPrivateHex, 'hex');
const iv = crypto.randomBytes(12);
const criptographyAllData = (data) => {
    const dataService = JSON.stringify(data);
    const cipher = crypto.createCipheriv("aes-256-gcm", keyPrivate, iv);
    let dataCriptography = cipher.update(dataService, 'utf-8', 'hex');
    dataCriptography += cipher.final('hex');
    const authTag = cipher.getAuthTag();
    let dataCriptographyJson = {
        data: dataCriptography,
        authTag: authTag
    };
    return dataCriptographyJson;
};
exports.criptographyAllData = criptographyAllData;
const decripyAllData = (dataCriptography, authTag) => {
    const decipher = crypto.createDecipheriv('aes-256-gcm', keyPrivate, iv);
    decipher.setAuthTag(authTag);
    let mensagemDescriptografada = decipher.update(dataCriptography, 'hex', 'utf8');
    mensagemDescriptografada += decipher.final('utf8');
    const objetoDecodificado = JSON.parse(mensagemDescriptografada);
    return objetoDecodificado;
};
exports.decripyAllData = decripyAllData;
