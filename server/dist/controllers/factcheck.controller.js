"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyClaim = void 0;
const gemini_service_1 = require("../services/gemini.service");
const verifyClaim = async (req, res) => {
    const { claim, language } = req.body;
    if (!claim) {
        return res.status(400).json({ error: 'Claim is required.' });
    }
    try {
        const model = (0, gemini_service_1.getGeminiModel)('gemini-1.5-flash');
        const prompt = `You are an official fact-checker for the Election Commission of India. 
Verify the following claim and return ONLY a raw JSON object with no markdown formatting.
Claim: "${claim}"
Language: ${language || 'English'}

The JSON should have these exact fields:
{
  "verdict": "True" | "False" | "Misleading" | "Unverifiable",
  "confidence": <number between 0 and 1>,
  "sources": [{"title": "source name", "url": "source url"}],
  "explanation": "Brief explanation of the fact-check"
}`;
        const result = await model.generateContent(prompt);
        const responseText = result.response.text().trim();
        // Remove markdown codeblocks if Gemini adds them
        const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanJson);
        res.status(200).json(parsed);
    }
    catch (error) {
        console.error('Fact-check Error:', error);
        res.status(500).json({ error: 'Failed to verify claim at this time.' });
    }
};
exports.verifyClaim = verifyClaim;
