import { prisma } from "../app.js";
import { createNewWallet } from "../services/controllers/wallet.js";
import {
  apiHandler,
  ErrorHandlerClass,
  ok,
} from "../services/errorHandling/index.js";
import { BAD_REQUEST_STATUS_CODE } from "../utils/constants/common.js";

const createUser = apiHandler(async (req, res, next) => {
  const tokenData = req.user;

  const isUser = await prisma.user.findFirst({
    where: {
      uId: tokenData.uId,
    },
  });

  if (isUser) {
    return ok({
      res,
      message: "User logged in successfully",
    });
  }

  const newWallet = createNewWallet();

  await prisma.user.create({ data: tokenData });
  await prisma.wallet.create({
    data: {
      userId: tokenData.uId,
      privateKey: newWallet.privateKey,
      publicKey: newWallet.publicKey,
    },
  });

  return ok({
    res,
    message: "User created successfully",
  });
});

const getUser = apiHandler(async (req, res, next) => {
  const tokenData = req.user;

  const user = await prisma.user.findFirst({
    where: {
      uId: tokenData.uId,
    },
  });

  return ok({
    res,
    data: user,
    message: "User found",
  });
});

export { createUser, getUser };
