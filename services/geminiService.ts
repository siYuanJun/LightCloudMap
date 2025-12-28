
import { GoogleGenAI, Type } from "@google/genai";
import { Word } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateKeywordsFromTopic = async (topic: string): Promise<Word[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `针对主题 "${topic}"，生成 15-20 个高度相关的中文关键词。
      每个关键词应包含一个权重值（1 到 5 之间，5 代表最重要）。
      请确保关键词多样化且具有代表性。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING, description: "关键词文本" },
              weight: { type: Type.NUMBER, description: "权重，1-5" }
            },
            required: ["text", "weight"]
          }
        }
      }
    });

    const raw = JSON.parse(response.text || "[]");
    return raw.map((item: any, index: number) => ({
      id: `ai-${index}-${Date.now()}`,
      text: item.text,
      weight: item.weight
    }));
  } catch (error) {
    console.error("Gemini 错误:", error);
    throw error;
  }
};
