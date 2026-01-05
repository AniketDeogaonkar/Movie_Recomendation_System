
import { GoogleGenAI, Type } from "@google/genai";
import { Movie, RecommendationResponse } from "../types";
import { MOVIES } from "./movieService";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSmartRecommendations = async (userInput: string): Promise<RecommendationResponse> => {
  const movieContext = MOVIES.map(m => ({
    id: m.id,
    title: m.title,
    genre: m.genre,
    description: m.description,
    year: m.year
  }));

  const prompt = `
    Based on the user's request: "${userInput}", 
    select the most appropriate movies from our database.
    
    Database Context: ${JSON.stringify(movieContext)}
    
    Return a JSON object with:
    1. recommendedIds: An array of movie IDs that best match the request.
    2. explanation: A friendly, conversational explanation (max 2 sentences) of why these movies were picked.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'The IDs of the recommended movies.'
            },
            explanation: {
              type: Type.STRING,
              description: 'Explanation for the recommendation.'
            }
          },
          required: ["recommendedIds", "explanation"]
        }
      }
    });

    const result = JSON.parse(response.text);
    return result as RecommendationResponse;
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      recommendedIds: MOVIES.slice(0, 3).map(m => m.id),
      explanation: "I couldn't process your request perfectly, but here are some popular picks you might enjoy!"
    };
  }
};
