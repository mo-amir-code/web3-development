import admin from "firebase-admin";
import { DecodedIdToken, getAuth } from "firebase-admin/auth";

const app = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const auth = getAuth(app);

const validateFirebaseToken = async (idToken: string): Promise<DecodedIdToken> => {
  try {
    const decoded = await auth.verifyIdToken(idToken);
    return decoded;
  } catch(error:any) {
    throw new Error("Invalid or expired token");
  }
};

export { auth, validateFirebaseToken };
