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
exports.assessmentTypeUser = void 0;
const message = __importStar(require("../../../modulo/config"));
const controllerRegisterAssessmentClient_1 = require("../../controllerCliente/registerAssessmentClient/controllerRegisterAssessmentClient");
const controllerRegisterAssessmentDiarist_1 = require("../../controllerDiarista/registerAssementDiarist/controllerRegisterAssessmentDiarist");
function validateHour(data) {
    const regexHora = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    if (regexHora.test(data)) {
        return true;
    }
    else {
        return false;
    }
}
const validateDate = (data) => {
    let status = true;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const dateRegexBar = /^\d{4}\/\d{2}\/\d{2}$/;
    if (!data.match(dateRegex) && !data.match(dateRegexBar)) {
        return false;
    }
    return status;
};
const assessmentTypeUser = async function (token, data) {
    let statusAssessment;
    if (typeof data.typeUser !== "string" || (data.typeUser.toLowerCase() !== "diarist" && data.typeUser.toLowerCase() !== "client")) {
        statusAssessment = message.ERRO_INVALID_TYPE_USER;
    }
    else if (typeof data.personEvaluatedId !== "number" || typeof data.star !== "number" || typeof data.comment !== "string") {
        statusAssessment = message.ERRO_REQUIRED_DATA_CLIENTE;
    }
    else if (!validateDate(data.date) || !validateHour(data.hour)) {
        statusAssessment = {
            status: 422,
            message: "Data ou Hora no forma inválido. Ex: Data: YYYY-MM-DD, Hora: 12:00"
        };
    }
    else if (data.star > 5 || data.star < 1) {
        statusAssessment = {
            status: 422,
            message: "Erro, o número minimo de estrelas é 1 e o máximo 5"
        };
    }
    else {
        if (data.typeUser.toLowerCase() === "client") {
            statusAssessment = await (0, controllerRegisterAssessmentClient_1.registerAssessmentClient)(token, data);
        }
        else if (data.typeUser.toLowerCase() === "diarist") {
            statusAssessment = await (0, controllerRegisterAssessmentDiarist_1.registerAssessmentDiarist)(token, data);
        }
        else {
            statusAssessment = {
                status: 422,
                message: "Erro, verifique os dados e tente novamente."
            };
        }
    }
    return statusAssessment;
};
exports.assessmentTypeUser = assessmentTypeUser;
