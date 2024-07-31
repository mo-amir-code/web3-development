// import { Connection, clusterApiUrl } from "@solana/web3.js";

// const connection = new Connection(clusterApiUrl("devnet"));
// console.log(connection);
// console.log(`✅ Connected!`)



// READ BALANCE FROM THE SOLANA CHAIN
import { clusterApiUrl, Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const address = new PublicKey("CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN")
const balance = await connection.getBalance(address);

console.log(`The balance of the account at ${address} is ${balance/LAMPORTS_PER_SOL} lamports`); 
console.log(`✅ Finished!`)