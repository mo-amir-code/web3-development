import { Connection } from "@solana/web3.js";
import { ENVIRONMENT, SOLANA_DEVNET, SOLANA_MAINNET } from "./constants.js";


const chain = ENVIRONMENT === "development" ? SOLANA_DEVNET : SOLANA_MAINNET;
const connection = new Connection(chain);


export {
    connection
}