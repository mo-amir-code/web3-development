import { prisma } from "../app.js";
import {
  apiHandler,
  ErrorHandlerClass,
  ok,
} from "../services/errorHandling/index.js";
import { BAD_REQUEST_STATUS_CODE } from "../utils/constants/common.js";

const getWalletKeys = apiHandler(async (req, res, next) => {
  const tokenData = req.user;
  const pId = req.params.id || 0;

  const wallet = await prisma.wallet.findFirst({
    where: {
      userId: tokenData.uId,
    },
  });

  if (!wallet) {
    return next(
      new ErrorHandlerClass("Something went wrong", BAD_REQUEST_STATUS_CODE)
    );
  }

  let key: string = wallet.publicKey;

  if (pId !== 0) {
    key = wallet.privateKey;
  }

  return ok({
    res,
    data: {
      key,
    },
    message: "Key found",
  });
});

export { getWalletKeys };
