import axios from "axios";
import {
  apiHandler,
  ErrorHandlerClass,
  ok,
} from "../services/errorHandling/index.js";
import { BAD_REQUEST_STATUS_CODE } from "../utils/constants/common.js";

const getSingleTokenInformation = apiHandler(async (req, res, next) => {
  let { chainId, tokenMintAddress }: any = req.query;

  chainId = parseInt(chainId || "0");

  if (chainId !== 1 && chainId !== 3) {
    return next(
      new ErrorHandlerClass("Invalid chain Id", BAD_REQUEST_STATUS_CODE)
    );
  }

  const phantomRes = await axios.get(
    `https://api.phantom.app/fungibles/v1/solana:10${chainId}/address/${tokenMintAddress}?includePrice=true&includeFungibleDetails=true`
  );

  return ok({
    res,
    data: phantomRes.data,
    message: "Token information fetched successfully",
  });
});

const getTokensInformation = apiHandler(async (req, res, next) => {
  let { chainId, walletAddress }: any = req.query;

  chainId = parseInt(chainId || "0");

  if (chainId !== 1 && chainId !== 3) {
    return next(
      new ErrorHandlerClass("Invalid chain Id", BAD_REQUEST_STATUS_CODE)
    );
  }

  const phantomRes = await axios.post(
    `https://api.phantom.app/tokens/v1?isSolCompressedTokensEnabled=true`,
    {
      addresses: [
        {
          address: walletAddress,
          chainId: `solana:10${chainId}`,
        },
      ],
    }
  );

  return ok({
    res,
    data: phantomRes.data,
    message: "Tokens information fetched successfully",
  });
});

const getTotalBalance = apiHandler(async (req, res, next) => {
  let { chainId, walletAddress }: any = req.query;

  chainId = parseInt(chainId || "0");

  if (chainId !== 1 && chainId !== 3) {
    return next(
      new ErrorHandlerClass("Invalid chain Id", BAD_REQUEST_STATUS_CODE)
    );
  }

  const phantomRes = await axios.get(
    `https://api.phantom.app/portfolio/v1/fungibles/value?walletAddresses=solana:10${chainId}/address:${walletAddress}`
  );

  return ok({
    res,
    data: phantomRes.data,
    message: "Total balance fetched successfully",
  });
});

const getTokensBalance = apiHandler(async (req, res, next) => {
  let { chainId, walletAddress }: any = req.query;

  chainId = parseInt(chainId || "0");

  if (chainId !== 1 && chainId !== 3) {
    return next(
      new ErrorHandlerClass("Invalid chain Id", BAD_REQUEST_STATUS_CODE)
    );
  }

  const phantomRes = await axios.get(
    `https://api.phantom.app/portfolio/v1/fungibles/balances?walletAddresses=solana:10${chainId}/address:${walletAddress}&includePrices=true`
  );

  return ok({
    res,
    data: phantomRes.data,
    message: "Tokens balances fetched successfully",
  });
});

export {
  getSingleTokenInformation,
  getTokensInformation,
  getTotalBalance,
  getTokensBalance,
};
