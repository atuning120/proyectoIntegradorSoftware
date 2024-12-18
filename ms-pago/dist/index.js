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
const pagos_1 = __importDefault(require("./routes/pagos"));
const connection_1 = require("./database/connection");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 3001;
app.use('/api/pagos', pagos_1.default);
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, connection_1.connectToDatabase)();
            app.listen(PORT, () => {
                console.log(`Server is running at http://localhost:${PORT}`);
            });
        }
        catch (error) {
            console.error("Error al iniciar el servidor:", error);
        }
    });
}
startServer();
