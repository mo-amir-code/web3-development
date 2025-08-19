import axios from "axios";
import { httpAxios } from "./axios";

const handleToGetKey = async (key: number) => {
  return await httpAxios.get(`/wallet/pk/${key}`);
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

export { handleToGetKey, handleToGetTokenBalances, handleToGetTotalBalance };
