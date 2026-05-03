"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_service_1 = __importDefault(require("../services/logger.service"));
const errorHandler = (err, req, res, next) => {
    logger_service_1.default.error(`${err.message} - ${req.method} ${req.url} - ${req.ip}`);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({
        error: {
            message,
            status,
            timestamp: new Date().toISOString()
        }
    });
};
exports.errorHandler = errorHandler;
