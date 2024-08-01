import {
    clusterApiUrl,
    Connection,
    Keypair,
    PublicKey,
  } from "@solana/web3.js";
  import * as fs from "fs";
  import path from "path";
  import os from "os";
import { createMint } from "@solana/spl-token";
  
  const main = async () => {
      // To get my local pc keypair path
    const homeDir = os.homedir();
    const keypairPath = path.join(homeDir, ".config", "solana", "id.json");
  
    const secret = JSON.parse(fs.readFileSync(keypairPath).toString());
    const secretKey = Uint8Array.from(secret);
    const ownerKeypair = Keypair.fromSecretKey(secretKey);
  
    // console.log(secretKey)
  //   console.log(senderKeypair.publicKey.toBase58())
  
    // const newKeypair = Keypair.generate();
    // const publicId = newKeypair.publicKey.toBase58();
    // console.log(publicId)
  
    // Making a transaction from one address to another
    
  
    const connection = new Connection(clusterApiUrl("devnet"));
    const authority = new PublicKey(
      "FqD5inS9Zw2DzK4TsMiaiBeesCnw5qky1RoUum2LJQ23"
    );

    
    const tokenMint = await createMint(
        connection,
        ownerKeypair,
        authority,
        authority,
        6
    );

    console.log(tokenMint.toBase58())
  };
  
  main();
  