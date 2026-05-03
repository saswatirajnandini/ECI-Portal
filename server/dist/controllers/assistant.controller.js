"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistory = exports.chat = void 0;
const gemini_service_1 = require("../services/gemini.service");
const chat = async (req, res) => {
    const { message, conversationId, language, state } = req.body;
    if (!message) {
        return res.status(400).json({ error: "Message is required." });
    }
    try {
        // Fallback logic for suggested Q&A
        const lowerMsg = message.toLowerCase();
        let responseText = "";
        if (lowerMsg.includes("how to register")) {
            responseText = "To register for voting in India, you can use the ECI's Voter Portal or the Voter Helpline App. You'll need Form 6 for new registration. Ensure you have age proof and residence proof ready.";
        }
        else if (lowerMsg.includes("voter id") || lowerMsg.includes("epic")) {
            responseText = "A Voter ID, also known as an EPIC (Electoral Photo Identity Card), is a photo identity card issued by the Election Commission of India. It serves as proof of identity and allows you to cast your vote.";
        }
        else if (lowerMsg.includes("polling booth")) {
            responseText = "You can find your polling booth by visiting the 'Know Your Polling Station' section on the ECI website or using the Voter Helpline App. Enter your EPIC number to get the exact location.";
        }
        else if (lowerMsg.includes("election dates")) {
            responseText = "Election dates vary by state and constituency. For the upcoming general elections and state assemblies, please check the official ECI schedule or the 'News' section on this portal.";
        }
        if (responseText) {
            return res.status(200).json({ text: responseText });
        }
        const model = (0, gemini_service_1.getGeminiModel)();
        const prompt = `You are the official ElectIQ Assistant for the Election Commission of India. 
Respond to the user's query about elections.
User's State/UT: ${state || 'Unknown'}
Preferred Language: ${language || 'English'}

User Query: ${message}`;
        const result = await model.generateContent(prompt);
        res.status(200).json({ text: result.response.text() });
    }
    catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({ error: "Failed to generate response from AI." });
    }
};
exports.chat = chat;
const getHistory = (req, res) => {
    const { conversationId } = req.params;
    // Mock chat history
    res.status(200).json({
        messages: [
            { role: "assistant", text: "Hello! I am ElectIQ Assistant." }
        ]
    });
};
exports.getHistory = getHistory;
