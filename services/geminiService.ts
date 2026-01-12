
import { GoogleGenAI, Type } from "@google/genai";
import { EvaluationResult, PracticeItem } from "../types";
import { MODEL_NAME } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function evaluateHandwriting(
  imageData: string,
  item: PracticeItem
): Promise<EvaluationResult> {
  const base64Data = imageData.split(',')[1];
  
  let specificInstructions = "";
  if (item.category === 'letters') {
    specificInstructions = "Evaluate stroke accuracy for Russian cursive, fluidity, and consistent slant.";
  } else if (item.category === 'words') {
    specificInstructions = "Evaluate the connections between letters in Russian cursive, legibility, and uniform baseline/height.";
  } else if (item.category === 'math') {
    specificInstructions = "Evaluate mathematical notation clarity, proportional sizing of symbols, and neatness.";
  } else if (item.category === 'shapes') {
    specificInstructions = "Evaluate geometric precision, symmetry, and smoothness of the lines.";
  }

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/png',
            data: base64Data,
          },
        },
        {
          text: `Target: '${item.char}' (Category: ${item.category}).
          ${specificInstructions}
          Provide a detailed assessment in Russian. 
          Focus on:
          1. Accuracy of the shape/form.
          2. Stroke quality and confidence.
          3. Overall aesthetic and legibility.
          
          Provide the output in Russian language.`
        }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.INTEGER, description: 'Overall score from 0 to 100' },
          accuracy: { type: Type.INTEGER, description: 'Percentage' },
          slantRating: { type: Type.STRING, description: 'Evaluation of slant or symmetry' },
          feedback: { type: Type.STRING, description: 'Feedback in Russian' },
          tips: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: 'Tips in Russian'
          }
        },
        required: ['score', 'accuracy', 'slantRating', 'feedback', 'tips']
      }
    }
  });

  try {
    const result = JSON.parse(response.text || '{}');
    return result as EvaluationResult;
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    throw new Error("Не удалось оценить почерк. Попробуйте еще раз.");
  }
}
