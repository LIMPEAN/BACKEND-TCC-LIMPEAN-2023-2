"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const port = process.env.PORT || 8080;
const cors = require('cors');
const server_1 = require("./server/server");
const app = express();
const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, OPTIONS'
};
app.use(cors(corsOptions));
app.use(server_1.server);
app.listen(port, () => console.log('Servidor Aguardando requisições na porta 8080'));
