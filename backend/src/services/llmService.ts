import fs from "fs";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function parseReceipt(imagePath: string) {
  const imageBase64 = fs.readFileSync(imagePath, "base64");

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [
            { text: "Extract receipt into JSON with merchant, date, items, total" },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: imageBase64
              }
            }
          ]
        }
      ]
    }
  );
  console.log(response.data)

  const rawText =
    response.data.candidates[0].content.parts[0].text;

  const cleaned = rawText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    return { error: "Parsing failed", raw: rawText };
  }
}