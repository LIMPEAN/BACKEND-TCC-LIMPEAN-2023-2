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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const loginTypeUser_1 = require("../../controller/controllerUser/login/loginTypeUser");
const registerTypeUser_1 = require("../../controller/controllerUser/register/registerTypeUser");
const assessmentTypeUser_1 = require("../../controller/controllerUser/assessment/assessmentTypeUser");
const controllerDataDiaristById_1 = require("../../controller/controllerDiarista/dataDiarist/controllerDataDiaristById");
const controllerDataAllDiarist_1 = require("../../controller/controllerDiarista/dataDiarist/controllerDataAllDiarist");
const controllerDeleteRegisterDiarist_1 = require("../../controller/controllerDiarista/deleteRegisterDiarist/controllerDeleteRegisterDiarist");
const controllerInvitationById_1 = require("../../controller/controllerDiarista/getAllServiceEspecific/controllerInvitationById");
const controllerUpdateServiceClient_1 = require("../../controller/controllerDiarista/updateService/controllerUpdateServiceClient");
const controllerDeleteRegisterClient_1 = require("../../controller/controllerCliente/deleteRegisterClient/controllerDeleteRegisterClient");
const controllerTokenServiceClient_1 = require("../../controller/controllerCliente/getStatusTokenService/controllerTokenServiceClient");
const controllerGetServiceClientById_1 = require("../../controller/controllerCliente/getAllServiceCliente/controllerGetServiceClientById");
const controllerRegisterTransactionService_1 = require("../../controller/controllerCliente/registerTransactionService/controllerRegisterTransactionService");
const controllerUpdateServiceClient_2 = require("../../controller/controllerCliente/updateService/controllerUpdateServiceClient");
const controllerUpdateDataPersonalDiarist_1 = require("../../controller/controllerDiarista/updateDataPersonalDiarist/controllerUpdateDataPersonalDiarist");
const controllerGetTokenService_1 = require("../../controller/controllerDiarista/getTokenService/controllerGetTokenService");
const controllerUpdateDataPersonalClient_1 = require("../../controller/controllerCliente/updateDataPersonalClient/controllerUpdateDataPersonalClient");
const controllerUpdateAddressClient_1 = require("../../controller/controllerCliente/updateDataPersonalClient/controllerUpdateAddressClient");
const controllerRegisterAddressClient_1 = require("../../controller/controllerCliente/registerAddresClient/controllerRegisterAddressClient");
const controllerDataClientById_1 = require("../../controller/controllerCliente/getDataClient/controllerDataClientById");
const controllerDataAllServiceOpenClients_1 = require("../../controller/controllerCliente/getAllServiceOpen/controllerDataAllServiceOpenClients");
const controllerRegisterServiceClient_1 = require("../../controller/controllerCliente/registerService/controllerRegisterServiceClient");
const controllerDeleterServiceClient_1 = require("../../controller/controllerCliente/deleteServiceClient/controllerDeleterServiceClient");
const controllerUpdateStatusService_1 = require("../../controller/controllerDiarista/updateStatusServiceDiaristWithClient/controllerUpdateStatusService");
const message = __importStar(require("../../modulo/config"));
const jwt = __importStar(require("jsonwebtoken"));
const jsonParser = body_parser_1.default.json();
const router = (0, express_1.Router)();
exports.router = router;
const verifyJWT = async function (request, response, next) {
    const token = request.headers['x-api-key'];
    const SECRETE = message.REQUIRE_SECRETE;
    if (!token) {
        return response.status(401).json(message.ERRO_REQUIRED_TOKEN);
    }
    try {
        jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE);
        next();
    }
    catch (error) {
        return response.status(401).json(message.ERRO_INVALID_TOKEN);
    }
};
router.post('/v1/limpean/cadastro', jsonParser, async function (request, response) {
    let contentType = request.headers['content-type'];
    const dataBody = request.body;
    const status = await (0, registerTypeUser_1.registerTypeUser)(dataBody);
    if (status) {
        response.status(status.status);
        response.json(status);
    }
    else {
        response.send(message.ERRO_REGISTER_USER);
    }
});
router.post('/v1/limpean/login', jsonParser, async function (request, response) {
    const dataBody = request.body;
    const statusLogin = await (0, loginTypeUser_1.loginTypeUser)(dataBody);
    if (statusLogin) {
        response.status(statusLogin.status);
        response.json(statusLogin);
    }
});
router.post('/v1/limpean/assessment', jsonParser, verifyJWT, async function (request, response) {
    const token = request.headers['x-api-key'];
    const dataBody = request.body;
    const statusAssessment = await (0, assessmentTypeUser_1.assessmentTypeUser)(token, dataBody);
    response.status(statusAssessment.status);
    response.json(statusAssessment);
});
router.delete('/v1/limpean/client', verifyJWT, async function (request, response) {
    const token = request.headers['x-api-key'];
    const statusClient = await (0, controllerDeleteRegisterClient_1.deleteRegisterClient)(token);
    response.status(statusClient.status);
    response.json(statusClient);
});
router.get('/v1/limpean/client/service-open', verifyJWT, async function (request, response) {
    const statusService = await (0, controllerDataAllServiceOpenClients_1.getDataAllServiceOpen)();
    response.status(statusService.status);
    response.json(statusService);
});
router.get('/v1/limpean/client', verifyJWT, async function (request, response) {
    const token = request.headers['x-api-key'];
    const statusClient = await (0, controllerDataClientById_1.getDataClient)(token);
    response.status(statusClient.status);
    response.json(statusClient);
});
router.put('/v1/limpean/client', verifyJWT, jsonParser, async function (request, response) {
    const token = request.headers['x-api-key'];
    const dataBody = request.body;
    const statusClient = await (0, controllerUpdateDataPersonalClient_1.updateDataClient)(token, dataBody);
    response.status(statusClient.status);
    response.json(statusClient);
});
router.post('/v1/limpean/client/new/register/address', verifyJWT, jsonParser, async function (request, response) {
    const dataBody = request.body;
    const token = request.headers['x-api-key'];
    const statusClient = await (0, controllerRegisterAddressClient_1.registerAddressCliente)(dataBody, token);
    if (statusClient) {
        response.status(statusClient.status);
        response.json(statusClient);
    }
    else {
        response.send(message.ERRO_INTERNAL_SERVER);
    }
});
router.put('/v1/limpean/client/update/register/address', verifyJWT, jsonParser, async function (request, response) {
    const token = request.headers['x-api-key'];
    const residenciaId = request.query.id;
    const dataBody = request.body;
    const statusAddress = await (0, controllerUpdateAddressClient_1.updateDataAddressClient)(token, residenciaId, dataBody);
    response.status(statusAddress.status);
    response.json(statusAddress);
});
router.post('/v1/limpean/client/register/service', verifyJWT, jsonParser, async function (request, response) {
    const token = request.headers['x-api-key'];
    const dataBody = request.body;
    const statusService = await (0, controllerRegisterServiceClient_1.registerService)(token, dataBody);
    response.status(statusService.status);
    response.json(statusService);
});
router.put('/v1/limpean/client/service', verifyJWT, jsonParser, async function (request, response) {
    const token = request.headers['x-api-key'];
    const dataBody = request.body;
    const statusService = await (0, controllerUpdateServiceClient_2.updateRegisterService)(token, dataBody);
    response.status(statusService.status);
    response.json(statusService);
});
router.post('/v1/limpean/client/register/transaction', verifyJWT, jsonParser, async function (request, response) {
    const token = request.headers['x-api-key'];
    const dataBody = request.body;
    const statusService = await (0, controllerRegisterTransactionService_1.registerTransaction)(token, dataBody);
    response.status(statusService.status);
    response.json(statusService);
});
router.delete('/v1/limpean/client/service/?id', verifyJWT, async function (request, response) {
    const token = request.headers['x-api-key'];
    const idService = request.query.service;
    const statusService = await (0, controllerDeleterServiceClient_1.deleteServiceClient)(token, idService);
    response.status(statusService.status);
    response.json(statusService);
});
router.get('/v1/limpean/client/service', verifyJWT, async function (request, response) {
    const statusTypeService = request.query.id;
    const token = request.headers['x-api-key'];
    const statusDiarist = await (0, controllerGetServiceClientById_1.getAllServiceClientById)(token, statusTypeService);
    response.status(statusDiarist.status);
    response.json(statusDiarist);
});
router.get("/v1/limpean/client/service/token", verifyJWT, async function (request, response) {
    const token = request.headers['x-api-key'];
    const idService = request.query.idService;
    const tokenService = request.query.token;
    const statusToken = await (0, controllerTokenServiceClient_1.getStatusTokenClient)(token, idService, tokenService);
    response.status(statusToken.status);
    response.json(statusToken);
});
router.get('/v1/limpean/diarists', verifyJWT, async function (request, response) {
    const statusDataDiarist = await (0, controllerDataAllDiarist_1.dataAllDiarist)();
    response.status(statusDataDiarist.status);
    response.json(statusDataDiarist);
});
router.delete('/v1/limpean/diarist', verifyJWT, async function (request, response) {
    const token = request.headers['x-api-key'];
    const statusDiarist = await (0, controllerDeleteRegisterDiarist_1.deleteRegisterDiarist)(token);
    response.status(statusDiarist.status);
    response.json(statusDiarist);
});
router.get('/v1/limpean/diarist', verifyJWT, async function (request, response) {
    const token = request.headers['x-api-key'];
    const statusDataDiarist = await (0, controllerDataDiaristById_1.dataDiaristById)(token);
    response.status(statusDataDiarist.status);
    response.json(statusDataDiarist);
});
router.get('/v1/limpean/diarist/service', verifyJWT, async function (request, response) {
    const statusTypeService = request.query.id;
    const token = request.headers['x-api-key'];
    const statusDiarist = await (0, controllerInvitationById_1.getInvitationById)(token, statusTypeService);
    response.status(statusDiarist.status);
    response.json(statusDiarist);
});
router.put('/v1/limpean/diarist', verifyJWT, jsonParser, async function (request, response) {
    const token = request.headers['x-api-key'];
    const dataBody = request.body;
    const statusDiarist = await (0, controllerUpdateDataPersonalDiarist_1.updateDataDiarist)(token, dataBody);
    response.status(statusDiarist.status);
    response.json(statusDiarist);
});
router.put('/v1/limpean/diarist/schedule-service', verifyJWT, jsonParser, async function (request, response) {
    const token = request.headers['x-api-key'];
    const idService = request.query.idService;
    const idStatus = request.query.idStatus;
    const data = {
        token: token,
        idService: idService,
        idStatus: idStatus
    };
    const statusService = await (0, controllerUpdateStatusService_1.updateStatusService)(data);
    response.status(statusService.status);
    response.json(statusService);
});
router.put('/v1/limpean/diarist/service/price', verifyJWT, jsonParser, async function (request, response) {
    const token = request.headers['x-api-key'];
    const dataBody = request.body;
    const statusService = await (0, controllerUpdateServiceClient_1.updatePriceServiceDiarist)(token, dataBody);
    response.status(statusService.status);
    response.json(statusService);
});
router.get('/v1/limpean/diarist/service/token', verifyJWT, async function (request, response) {
    const token = request.headers['x-api-key'];
    const idService = request.query.idService;
    const tokenService = await (0, controllerGetTokenService_1.getTokenService)(token, idService);
    response.status(tokenService.status);
    response.json(tokenService);
});
