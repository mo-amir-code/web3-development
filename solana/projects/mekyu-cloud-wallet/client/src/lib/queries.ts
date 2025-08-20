import axios from "axios";
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

const handleToGetTokenBalances = async ({
  chainId,
  walletAddress,
}: {
  chainId: 1 | 3;
  walletAddress: string;
}) => {
  return await axios.get(
    `https://api.phantom.app/portfolio/v1/fungibles/balances?walletAddresses=solana:10${chainId}/address:${walletAddress}&includePrices=true`
  );
};

const handleToGetTotalBalance = async ({
  chainId,
  walletAddress,
}: {
  chainId: 1 | 3;
  walletAddress: string;
}) => {
  return await axios.get(
    `https://api.phantom.app/portfolio/v1/fungibles/value?walletAddresses=solana:10${chainId}/address:${walletAddress}`
  );
};

const handleToGetTokensInformation = async ({
  chainId,
  walletAddress,
}: {
  chainId: 1 | 3;
  walletAddress: string;
}) => {
  return await axios.post(
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
};

const handleToGetSingleTokenInformation = async ({
  chainId,
  tokenMintAddress,
}: {
  chainId: 1 | 3;
  tokenMintAddress: string;
}) => {
  return await axios.get(
    `https://api.phantom.app/fungibles/v1/solana:10${chainId}/address/${tokenMintAddress}?includePrice=true&includeFungibleDetails=true`
  );
};

export {
  handleToGetKey,
  handleToGetTokensInformation,
  handleToGetTokenBalances,
  handleToGetTotalBalance,
  handleToTransfer,
  handleToGetActivities,
  handleToGetSingleTokenInformation,
  handleToGetTransaction,
};
