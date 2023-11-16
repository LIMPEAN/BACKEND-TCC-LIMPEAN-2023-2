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
exports.validate = exports.createJWT = void 0;
const message = __importStar(require("../modulo/config"));
const jwt = require('jsonwebtoken');
const SECRETE = message.REQUIRE_SECRETE;
const EXPIRES = "24h";
const createJWT = (payload) => {
    const token = jwt.sign({
        name: payload.email,
        id: payload.id
    }, SECRETE, { expiresIn: EXPIRES });
    return token;
};
exports.createJWT = createJWT;
const validate = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRETE, (err, decoded) => {
            if (err) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    });
};
exports.validate = validate;
