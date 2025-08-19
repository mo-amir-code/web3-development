import { ALCHEMY_KEY, ENVIRONMENT } from "./secrets";

const SOLANA_MAINNET = `https://solana-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`;
const SOLANA_DEVNET = `https://solana-devnet.g.alchemy.com/v2/${ALCHEMY_KEY}`;

const SOLANA_CHAIN =
  ENVIRONMENT === "development" ? SOLANA_DEVNET : SOLANA_MAINNET;

export { SOLANA_DEVNET, SOLANA_MAINNET, SOLANA_CHAIN };
