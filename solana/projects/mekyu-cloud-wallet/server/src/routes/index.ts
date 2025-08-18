import express from "express";
import userRoutes from "./user.routes.js"
import walletRoutes from "./wallet.routes.js"
import transactionRoutes from "./transaction.routes.js"
import { isUserAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.use("/api/user", isUserAuthenticated, userRoutes);
router.use("/api/wallet", isUserAuthenticated, walletRoutes);
router.use("/api/transaction", isUserAuthenticated, transactionRoutes);

export default router;