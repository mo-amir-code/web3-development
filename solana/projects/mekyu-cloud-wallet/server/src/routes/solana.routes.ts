import express from "express";
import { zodValidation } from "../services/zod/index.js";
import {
  SolanaCommonZodSchema,
  SolanaTokenZodSchema,
} from "../services/zod/solana.js";
import {
  getSingleTokenInformation,
  getTokensInformation,
  getTotalBalance,
} from "../controllers/solana.controller.js";

const router = express.Router();

router.get(
  "/token",
  zodValidation(SolanaTokenZodSchema),
  getSingleTokenInformation
);
router.get(
  "/tokens",
  zodValidation(SolanaCommonZodSchema),
  getTokensInformation
);
router.get("/balance", zodValidation(SolanaCommonZodSchema), getTotalBalance);
router.get(
  "/tokens/balances",
  zodValidation(SolanaCommonZodSchema),
  getTotalBalance
);

export default router;
