
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();


const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


export default async function gemini(prompt) {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

