"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGeminiModel = void 0;
const generative_ai_1 = require("@google/generative-ai");
const config_1 = require("../config");
// Initialize the API with the key from centralized configuration
const genAI = new generative_ai_1.GoogleGenerativeAI(config_1.config.gemini.apiKey);
const getGeminiModel = (modelName = 'gemini-1.5-flash') => {
    return genAI.getGenerativeModel({ model: modelName });
};
exports.getGeminiModel = getGeminiModel;
