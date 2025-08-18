import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { SendTransactionType } from "../../types/controllers/transaction.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { connection } from "../../config/solana.js";
import { privateKeyBase58ToUint8Array } from "./wallet.js";

export type SendTransactionMethodType = SendTransactionType & {
  secretKey: string;
};

const sendTransaction = async ({
  amount,
  toPubKey,
  tokenMintAddress,
  secretKey,
}: SendTransactionMethodType): Promise<string> => {
  const tokenAddress = new PublicKey(tokenMintAddress);
  const toAddress = new PublicKey(toPubKey!);
  const sender = Keypair.fromSecretKey(privateKeyBase58ToUint8Array(secretKey));

  let transaction = new Transaction();
  let signature: string | null = null;

  if (tokenMintAddress.startsWith("So")) {
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: sender.publicKey,
        toPubkey: toAddress,
        lamports: amount,
      })
    );

    transaction.feePayer = sender.publicKey;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
    transaction.sign(sender);

    const rawTransaction = transaction.serialize();

    signature = await connection.sendRawTransaction(rawTransaction);
  } else {
    const sendTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      sender,
      tokenAddress,
      sender.publicKey
    );
    const receiverTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      sender,
      tokenAddress,
      toAddress
    );

    signature = await transfer(
      connection,
      sender,
      sendTokenAccount.address,
      receiverTokenAccount.address,
      sender,
      amount
    );
  }

  return signature;
};

const trackConfirmation = async (signature: string): Promise<boolean> => {
  const maxTries = 10;
  const delay = 2000;
  let tries = 0;
  let confirmed = false;

  while (tries < maxTries && !confirmed) {
    const status = await connection.getSignatureStatus(signature, {
      searchTransactionHistory: true,
    });
    const confirmation = status.value?.confirmationStatus;

    if (confirmation === "confirmed" || confirmation === "finalized") {
      confirmed = true;
      break;
    }

    tries++;
    if (tries < maxTries) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  return confirmed;
};

export { sendTransaction, trackConfirmation };
