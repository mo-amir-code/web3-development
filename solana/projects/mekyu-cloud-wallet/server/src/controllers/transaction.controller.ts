import { prisma } from "../app.js";
import {
  sendTransaction,
  SendTransactionMethodType,
  trackConfirmation,
} from "../services/controllers/transaction.js";
import {
  apiHandler,
  ErrorHandlerClass,
  ok,
} from "../services/errorHandling/index.js";
import { SendTransactionBodyType } from "../types/controllers/transaction.js";
import { BAD_REQUEST_STATUS_CODE } from "../utils/constants/common.js";

const getTransactionById = apiHandler(async (req, res, next) => {
  const tId = parseInt(req.params.id) as number | null;

  if (!tId) {
    return next(
      new ErrorHandlerClass(
        "Transaction ID is missing",
        BAD_REQUEST_STATUS_CODE
      )
    );
  }

  const txn = await prisma.transaction.findFirst({
    where: {
      id: tId,
    },
  });

  if (!txn) {
    return next(
      new ErrorHandlerClass(
        "Transaction ID is invalid",
        BAD_REQUEST_STATUS_CODE
      )
    );
  }

  return ok({
    res,
    data: {
      transaction: txn,
    },
    message: "Transaction found",
  });
});

const getTransactions = apiHandler(async (req, res, next) => {
  const tokenData = req.user;

  const wallet = await prisma.wallet.findFirst({
    where: {
      userId: tokenData.uId,
    },
  });

  const txns = await prisma.transaction.findMany({
    where: {
      walletId: wallet?.id!,
    },
  });

  return ok({
    res,
    data: {
      transactions: txns,
    },
    message: "Transactions found",
  });
});

const sendTransactionOnChain = apiHandler(async (req, res, next) => {
  const tokenData = req.user;
  const data = req.body as SendTransactionBodyType;

  const wallet = await prisma.wallet.findFirst({
    where: {
      userId: tokenData.uId,
    },
  });

  // Extracting toUser public key if user is selected email
  if (data.mode === "mail") {
    const toUser = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!toUser) {
      return next(
        new ErrorHandlerClass(
          "Email is not registered yet",
          BAD_REQUEST_STATUS_CODE
        )
      );
    }

    const toUserWallet = await prisma.wallet.findFirst({
      where: {
        userId: toUser.uId,
      },
    });

    data.toPubKey = toUserWallet?.publicKey!;
  }

  const txnBody: SendTransactionMethodType = {
    amount: data.amount,
    toPubKey: data.toPubKey,
    secretKey: wallet?.privateKey!,
    tokenMintAddress: data.tokenMintAddress,
  };
  const signature = await sendTransaction(txnBody);

  await prisma.transaction.create({
    data: {
      amount: data.amount,
      fromPubKey: wallet?.publicKey!,
      signature,
      tokenMint: data.tokenMintAddress,
      toPubKey: data.toPubKey!,
      walletId: wallet?.id!,
    },
  });

  ok({
    res,
    data: {
      signature,
    },
    message: "Transactions is in progress.",
  });

  const result = await trackConfirmation(signature);
  await prisma.transaction.update({
    data: {
      status: result ? "SUCCESSED" : "FAILED",
    },
    where: {
      signature,
    },
  });
});

export { getTransactionById, getTransactions, sendTransactionOnChain };
