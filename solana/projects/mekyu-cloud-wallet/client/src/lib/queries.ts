// import axios from "axios";
import { httpAxios } from "./axios";
import type { SendTransactionTYpe } from "@/types/lib/queries";

const handleToGetKey = async (key: number) => {
  return await httpAxios.get(`/wallet/pk/${key}`);
};

const handleToTransfer = async (data: SendTransactionTYpe) => {
  let updatedData = {
    ...data,
    amount: data.amount.toString(),
  };
  return await httpAxios.post(`/transaction`, updatedData);
};

const handleToGetTransaction = async (sig: string) => {
  return await httpAxios.get(`/transaction/${sig}`);
};

const handleToGetActivities = async () => {
  return await httpAxios.get(`/transaction`);
};

const handleToAuth = async () => {
  return await httpAxios.post(`/user`);
};

const handleToGetTokenBalances = async ({
  chainId,
  walletAddress,
}: {
  chainId: 1 | 3;
  walletAddress: string;
}) => {
  return await httpAxios.get(
    `/solana/tokens/balances?chainId=${chainId}&walletAddress=${walletAddress}`
  );
};

const handleToGetTotalBalance = async ({
  chainId,
  walletAddress,
}: {
  chainId: 1 | 3;
  walletAddress: string;
}) => {
  return await httpAxios.get(
    `/solana/balance?chainId=${chainId}&walletAddress=${walletAddress}`
  );
};

const handleToGetTokensInformation = async ({
  chainId,
  walletAddress,
}: {
  chainId: 1 | 3;
  walletAddress: string;
}) => {
  const res = await httpAxios.get(
    `/solana/tokens?chainId=${chainId}&walletAddress=${walletAddress}`
  );
  return res.data;
};

const handleToGetSingleTokenInformation = async ({
  chainId,
  tokenMintAddress,
}: {
  chainId: 1 | 3;
  tokenMintAddress: string;
}) => {
  const res = await httpAxios.get(
    `/solana/token?chainId=${chainId}&tokenMintAddress=${tokenMintAddress}`
  );
  return res.data;
};

export {
  handleToGetKey,
  handleToGetTokensInformation,
  handleToAuth,
  handleToGetTokenBalances,
  handleToGetTotalBalance,
  handleToTransfer,
  handleToGetActivities,
  handleToGetSingleTokenInformation,
  handleToGetTransaction,
};
