import { Keypair, PublicKey } from "@solana/web3.js";
import * as fs from "fs";

// const keyPair = Keypair.generate();
// console.log(keyPair.publicKey.toBase58())

// const pk = new PublicKey("8GQAniirziN2Gv8krbyGxuEWZLgyno6yvub8VEr6siLZ")
// console.log(pk.toBase58())

const secret = JSON.parse(fs.readFileSync("ephkey.json").toString());
const secretKey = Uint8Array.from(secret);
const ownerKeyPair = Keypair.generate(secretKey);

const publicKey = ownerKeyPair.publicKey.toBase58();
console.log(publicKey);

