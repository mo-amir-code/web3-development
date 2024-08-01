// import { Keypair } from "@solana/web3.js";
// const keyPair = Keypair.generate();

// console.log(keyPair)
// console.log(`The public key is: `, keyPair.publicKey.toBase58());
// console.log(`The secret key is: `, keyPair.secretKey);



// Key Pairs from environment
import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const keypair = getKeypairFromEnvironment("PAIR_KEY");
console.log(keypair)