import express from "express";
import { getWalletKeys } from "../controllers/wallet.controller.js";

const router = express.Router();

router.get("/pk/:id", getWalletKeys);

export default router;