import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config';

// Initialize the API with the key from centralized configuration
const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

export const getGeminiModel = (modelName = 'gemini-1.5-flash') => {
  return genAI.getGenerativeModel({ model: modelName });
};
