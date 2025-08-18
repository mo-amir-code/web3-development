import express from "express";
import {
  getTransactionById,
  getTransactions,
  sendTransactionOnChain,
} from "../controllers/transaction.controller.js";
import { zodValidation } from "../services/zod/index.js";
import { SendTransactionZodSchema } from "../services/zod/transaction.js";

const router = express.Router();

router.get("/", getTransactions);
router.get("/:id", getTransactionById);
router.post(
  "/",
  zodValidation(SendTransactionZodSchema),
  sendTransactionOnChain
);

export default router;
