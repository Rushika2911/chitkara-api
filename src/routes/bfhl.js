import express from "express";
import { fibonacci } from "../utils/fibonacci.js";
import { filterPrimes } from "../utils/prime.js";
import { calcLCM } from "../utils/lcm.js";
import { calcHCF } from "../utils/hcf.js";
import { askGemini } from "../services/ai.service.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const keys = Object.keys(body);

    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        official_email: process.env.OFFICIAL_EMAIL,
        error: "Exactly one key required"
      });
    }

    const key = keys[0];
    const value = body[key];
    let data;

    if (key === "fibonacci") data = fibonacci(value);
    else if (key === "prime") data = filterPrimes(value);
    else if (key === "lcm") data = calcLCM(value);
    else if (key === "hcf") data = calcHCF(value);
    else if (key === "AI") data = await askGemini(value);
    else throw new Error("Invalid key");

    res.status(200).json({
      is_success: true,
      official_email: process.env.OFFICIAL_EMAIL,
      data
    });
  } catch (e) {
    res.status(400).json({
      is_success: false,
      official_email: process.env.OFFICIAL_EMAIL,
      error: e.message
    });
  }
});

export default router;
