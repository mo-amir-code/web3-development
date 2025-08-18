// Privated Credentials
const APP_PORT = process.env.APP_PORT || 8080;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const DB_URI = process.env.DB_URI!;
const ENVIRONMENT = process.env.ENVIRONMENT;
const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const ALCHEMY_KEY = process.env.ALCHEMY_KEY;

const WHITELISTED_ORIGINS = [CLIENT_ORIGIN];

const SOLANA_MAINNET = `https://solana-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`
const SOLANA_DEVNET = `https://solana-devnet.g.alchemy.com/v2/${ALCHEMY_KEY}`

export {
  APP_PORT,
  JWT_SECRET_KEY,
  DB_URI,
  ENVIRONMENT,
  WHITELISTED_ORIGINS,
  GOOGLE_APPLICATION_CREDENTIALS,
  ALCHEMY_KEY,
  SOLANA_DEVNET,
  SOLANA_MAINNET
};
