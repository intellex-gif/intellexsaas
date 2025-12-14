import { GoogleGenAI } from "@google/genai";

// Initialize Gemini AI
// NOTE: In a real app, ensure process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getGeminiInsights = async (contextData: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Demo Mode: API Key missing. Connect Google Gemini API to get real-time demand forecasting and strategic insights.";
  }

  try {
    const model = ai.models;
    const prompt = `
      You are an expert Retail Analyst for a large Cash & Carry business.
      Analyze the following dashboard context data and provide 3 key strategic insights.
      Focus on:
      1. Inventory optimization (what to restock or clear).
      2. Sales trends.
      3. A specific action item for the store manager.

      Context:
      ${contextData}

      Keep the response concise, professional, and formatted as a bulleted list using markdown.
    `;

    const response = await model.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to generate insights at this moment. Please check your connection.";
  }
};

export const getGoToMarketStrategy = async (): Promise<string> => {
    if (!process.env.API_KEY) {
        return "Connect API Key to generate GTM Strategy.";
    }

    try {
        const model = ai.models;
        const prompt = "Create a concise go-to-market strategy for launching a SaaS POS in Pakistan targeting mega marts. Focus on pricing, distribution channels, and unique value propositions.";
        const response = await model.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });
        return response.text;
    } catch (e) {
        return "Failed to fetch strategy.";
    }
}