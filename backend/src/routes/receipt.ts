import express from "express";
import multer from "multer";
import { parseReceipt } from "../services/llmService";

import { saveReceipt } from "../db/storage";

const router = express.Router();

router.post("/save", (req, res) => {
  try {
    const data = req.body;

    saveReceipt(data);

    res.json({ message: "Saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Save failed" });
  }
});

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await parseReceipt(file.path);

    res.json(result);
  } catch (err: any) {
    console.error("ERROR:", err?.response?.data || err.message);
    res.status(500).json({ error: "Parsing failed" });
  }
});

export default router;