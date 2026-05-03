import { config } from '../config';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  sources?: { title: string; url: string }[];
  timestamp: Date;
}

export async function sendChatMessage(
  _messages: ChatMessage[],
  userMessage: string
): Promise<string> {
  try {
    const response = await fetch(`${config.api.baseUrl}/assistant/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.text || 'I apologize, but I was unable to generate a response. Please try again.';
  } catch (error) {
    console.error('Backend API error:', error);
    return `❌ Error communicating with backend service. Please try again later.`;
  }
}

export async function factCheckClaim(claim: string): Promise<{
  verdict: 'TRUE' | 'FALSE' | 'MISLEADING' | 'UNVERIFIED';
  explanation: string;
  confidence: number;
  sources: { title: string; url: string }[];
}> {
  try {
    const response = await fetch(`${config.api.baseUrl}/factcheck/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ claim })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    
    return {
      verdict: data.verdict?.toUpperCase() || 'UNVERIFIED',
      explanation: data.explanation || data.analysis || 'Analysis complete.',
      confidence: data.confidence || 0.5,
      sources: data.sources || []
    };
  } catch (error) {
    console.error('Fact check error:', error);
    return {
      verdict: 'UNVERIFIED',
      explanation: 'Error during analysis. Please try again.',
      confidence: 0,
      sources: []
    };
  }
}
