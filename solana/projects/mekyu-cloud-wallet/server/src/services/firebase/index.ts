import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { FIREBASE_API_KEY_PATH } from "../../config/constants.js";
const serviceAccount = require(FIREBASE_API_KEY_PATH!);

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = getAuth(app);

const validateFirebaseToken = async (idToken: string) => {
  try {
    const decoded = await auth.verifyIdToken(idToken);
    return decoded;
  } catch {
    throw new Error("Invalid or expired token");
  }
};

export { auth, validateFirebaseToken };
