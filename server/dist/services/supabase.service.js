"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const config_1 = require("../config");
const logger_service_1 = __importDefault(require("./logger.service"));
if (!config_1.config.supabase.url || !config_1.config.supabase.anonKey) {
    logger_service_1.default.error('Supabase credentials missing in configuration');
}
exports.supabase = (0, supabase_js_1.createClient)(config_1.config.supabase.url, config_1.config.supabase.anonKey);
