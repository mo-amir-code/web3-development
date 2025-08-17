// Privated Credentials
const APP_PORT = process.env.APP_PORT || 8080;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const DB_URI = process.env.DB_URI!;
const ENVIRONMENT = process.env.ENVIRONMENT;
const FIREBASE_API_KEY_PATH = process.env.FIREBASE_API_KEY_PATH;

const WHITELISTED_ORIGINS = [CLIENT_ORIGIN];

export {
  APP_PORT,
  JWT_SECRET_KEY,
  DB_URI,
  ENVIRONMENT,
  WHITELISTED_ORIGINS,
  FIREBASE_API_KEY_PATH,
};
