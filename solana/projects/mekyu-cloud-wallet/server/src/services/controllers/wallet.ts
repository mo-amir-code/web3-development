import { Keypair } from "@solana/web3.js";
import bs58 from 'bs58';
import { CreateNewWalletResponseType } from "../../types/controllers/wallet.js";

export const createNewWallet = (): CreateNewWalletResponseType => {
  const wallet = Keypair.generate();
  return {
    publicKey: wallet.publicKey.toBase58().toString(),
    privateKey: privateKeyUint8ArrayToBase58(wallet.secretKey),
  };
};

export function privateKeyUint8ArrayToBase58(uint8array: Uint8Array): string {
  return bs58.encode(Buffer.from(uint8array));
}

export function privateKeyBase58ToUint8Array(base58String: string): Uint8Array {
  return bs58.decode(base58String);
}

