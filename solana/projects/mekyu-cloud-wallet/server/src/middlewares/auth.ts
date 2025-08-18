import {
  apiHandler,
  ErrorHandlerClass,
} from "../services/errorHandling/index.js";
import { validateFirebaseToken } from "../services/firebase/index.js";
import { UNAUTHORIZED_REQUEST_STATUS_CODE } from "../utils/constants/common.js";

const isUserAuthenticated = apiHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(
      new ErrorHandlerClass(
        "No authorization header",
        UNAUTHORIZED_REQUEST_STATUS_CODE
      )
    );
  }

  const idToken = authHeader.split("Bearer ")[1];
  if (!idToken) {
    return next(
      new ErrorHandlerClass(
        "Invalid authorization header",
        UNAUTHORIZED_REQUEST_STATUS_CODE
      )
    );
  }

  try {
    const userData = await validateFirebaseToken(idToken);
    const user = {
      uId: userData.uid,
      email: userData.email
    };
    console.log("User is here: ", user);
    // Attach user data to the request object for use in routes
    (req as any).user = user;
    next();
  } catch{
    next(
      new ErrorHandlerClass(
        "Invalid or expired token",
        UNAUTHORIZED_REQUEST_STATUS_CODE
      )
    );
  }
});

export { isUserAuthenticated };
