import { JWT_SECRET_KEY } from "../../config/constants.js";
import jwt from "jsonwebtoken";
import { CURRENT_DATE_IN_JWT_FORM } from "../../utils/constants/common.js";

const isJwtTokenExpired = (token: string | undefined): boolean => {
    if (!token) {
        return true
    }

    const { exp } = jwt.verify(token, JWT_SECRET_KEY!) as { exp: number };

    if (CURRENT_DATE_IN_JWT_FORM > exp) {
        return true;
    }

    return false;
}

export {
    isJwtTokenExpired
}