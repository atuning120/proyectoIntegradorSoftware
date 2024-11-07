"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const async_handler_1 = __importDefault(require("../utils/async_handler"));
const WebpayPlus = require("transbank-sdk").WebpayPlus;
const router = express_1.default.Router();
// Endpoint para crear una transacción
router.post('/create', (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount } = req.body;
        if (!amount) {
            return res.status(400).send('El monto es requerido');
        }
        let buyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
        let sessionId = "S-" + Math.floor(Math.random() * 10000) + 1;
        let returnUrl = req.protocol + "://" + req.get("host") + "/api/pagos/commit";
        const createResponse = yield (new WebpayPlus.Transaction()).create(buyOrder, sessionId, amount, returnUrl);
        const token = createResponse.token;
        const url = createResponse.url;
        const paymentUrl = `${url}?token_ws=${token}`;
        res.json({
            buyOrder,
            sessionId,
            amount,
            returnUrl,
            paymentUrl
        });
    }
    catch (error) {
        console.error('Error al crear la transacción:', error);
        res.status(500).send('Error al crear la transacción');
    }
})));
// Endpoint para confirmar una transacción
router.post('/commit', (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { token_ws } = req.body;
        if (!token_ws) {
            return res.status(400).send('El token_ws es requerido');
        }
        const commitResponse = yield (new WebpayPlus.Transaction()).commit(token_ws);
        res.json({
            token: token_ws,
            commitResponse,
        });
    }
    catch (error) {
        console.error('Error al confirmar la transacción:', error);
        res.status(500).send('Error al confirmar la transacción');
    }
})));
router.get('/commit', (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { token_ws } = req.query;
        if (!token_ws) {
            return res.status(400).send('El token_ws es requerido');
        }
        const commitResponse = yield (new WebpayPlus.Transaction()).commit(token_ws);
        res.json({
            token: token_ws,
            commitResponse,
        });
    }
    catch (error) {
        console.error('Error al confirmar la transacción:', error);
        res.status(500).send('Error al confirmar la transacción');
    }
})));
exports.default = router;
