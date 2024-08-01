import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import * as fs from "fs";
import path from "path";
import os from "os";

const main = async () => {
    // To get my local pc keypair path
  const homeDir = os.homedir();
  const keypairPath = path.join(homeDir, ".config", "solana", "id.json");

  const secret = JSON.parse(fs.readFileSync(keypairPath).toString());
  const secretKey = Uint8Array.from(secret);
  const senderKeypair = Keypair.fromSecretKey(secretKey);

  // console.log(secretKey)
//   console.log(senderKeypair.publicKey.toBase58())

  // const newKeypair = Keypair.generate();
  // const publicId = newKeypair.publicKey.toBase58();
  // console.log(publicId)

  // Making a transaction from one address to another
  

  const connection = new Connection(clusterApiUrl("devnet"));
  const reciever = new PublicKey(
    "FqD5inS9Zw2DzK4TsMiaiBeesCnw5qky1RoUum2LJQ23"
  );

//   To get the balance of any address by public key
//   let balance = await connection.getBalance(senderKeypair.publicKey);
//   console.log(`Current balance: ${balance / LAMPORTS_PER_SOL} SOL`);

  const transaction = new Transaction();

  const solToTransfer = 0.2;

  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey: reciever,
    lamports: LAMPORTS_PER_SOL * solToTransfer,
  });

  transaction.add(sendSolInstruction);

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    senderKeypair,
  ]);

  console.log("Signature of sol transaction:  ", signature);
};

main();
