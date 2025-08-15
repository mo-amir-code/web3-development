import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction,
} from "@solana/web3.js";

export function SendTokens() {
    const wallet = useWallet();
    const { connection } = useConnection();

    async function sendTokens() {
        let to = document.getElementById("to").value;
        let token = document.getElementById("amount").value;
        
        const transaction = new Transaction();
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: new PublicKey(to),
                lamports: token * LAMPORTS_PER_SOL
            })
        )

        await wallet.sendTransaction(transaction, connection);
        alert("Transaction has been done");
    }

    return (
        <div>
            <input id="to" type="text" placeholder="To" />
            <input id="amount" type="text" placeholder="Amount" />
            <button onClick={sendTokens}>Send</button>
        </div>
    );
}