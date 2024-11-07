"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor', details: error.message });
    });
};
exports.default = asyncHandler;
