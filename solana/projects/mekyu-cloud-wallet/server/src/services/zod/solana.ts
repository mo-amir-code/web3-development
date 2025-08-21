import { z } from "zod";

export const SolanaCommonZodSchema = z.object({
  query: z.object({
    chainId: z.string(),
    walletAddress: z.string(),
  }),
});

export const SolanaTokenZodSchema = z.object({
  query: z.object({
    chainId: z.string(),
    tokenMintAddress: z.string(),
  }),
});
