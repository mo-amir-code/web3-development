import { z } from "zod";

// Assuming TransactionModeType is an enum or union, eg:
const TransactionModeType = z.enum(["mail", "address"]); // adjust as needed

export const SendTransactionZodSchema = z.object({
  body: z.object({
    tokenMintAddress: z.string(),
    toPubKey: z.string().nullable(),
    amount: z.string(),
    email: z.email().optional(),
    mode: TransactionModeType,
    programId: z.string().nullable(),
  }),
});
