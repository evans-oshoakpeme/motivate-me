import express from "express";
import cors from "cors";
import {GoogleGenAI} from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");

    if (req.method !== "GET") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    try {
        // Request structured JSON output from the Gemini model
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: 'Generate a short, unique, and deeply impactful motivational quote. Provide your answer in a strict JSON format containing two keys: "quote" and "author". Do not include markdown blocks.',
        });

        const data = JSON.parse(response.text.trim());
        res.json(data);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Failed to fetch a fresh quote.' });
    }
};