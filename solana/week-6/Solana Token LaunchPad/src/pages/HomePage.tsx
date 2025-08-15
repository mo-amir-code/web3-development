import {
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  ExtensionType,
  getMintLen,
  LENGTH_SIZE,
  TOKEN_2022_PROGRAM_ID,
  TYPE_SIZE,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import {
  createInitializeInstruction,
  pack,
  type TokenMetadata,
} from "@solana/spl-token-metadata";

const HomePage = () => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const createToken = async () => {
    const name =
      (document.getElementById("name") as HTMLInputElement)?.value || "";
    const symbol =
      (document.getElementById("symbol") as HTMLInputElement)?.value || "";
    const image =
      (document.getElementById("image") as HTMLInputElement)?.value || "";
    const supply =
      (document.getElementById("supply") as HTMLInputElement)?.value || "";

    const keypair = Keypair.generate();

    const metadata: TokenMetadata = {
      updateAuthority: wallet.publicKey!,
      mint: keypair.publicKey,
      name,
      symbol,
      uri: image,
      additionalMetadata: [],
    };

    const mintLen = getMintLen([ExtensionType.MetadataPointer]);
    const metadata_len = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

    const lamports = await connection.getMinimumBalanceForRentExemption(
      mintLen + metadata_len
    );

    const transaction = new Transaction();
    transaction.add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey!,
        newAccountPubkey: keypair.publicKey,
        space: mintLen,
        lamports,
        programId: TOKEN_2022_PROGRAM_ID,
      }),
      createInitializeMetadataPointerInstruction(
        keypair.publicKey,
        wallet.publicKey,
        keypair.publicKey,
        TOKEN_2022_PROGRAM_ID
      ),
      createInitializeMintInstruction(
        keypair.publicKey,
        9,
        wallet.publicKey!,
        null,
        TOKEN_2022_PROGRAM_ID
      ),
      createInitializeInstruction({
        programId: TOKEN_2022_PROGRAM_ID,
        mint: keypair.publicKey,
        metadata: keypair.publicKey,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        mintAuthority: wallet.publicKey!,
        updateAuthority: wallet.publicKey!,
      })
    );

    transaction.feePayer = wallet.publicKey!;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
    transaction.partialSign(keypair);

    await wallet.sendTransaction(transaction, connection);

    console.log(`Token mint created at ${keypair.publicKey.toBase58()}`);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="flex items-center justify-center flex-col gap-2">
        <WalletMultiButton />
        <WalletDisconnectButton />
      </div>

      <div className="space-y-1">
        <h1>Solana Token Launchpad</h1>
        <input
          className="inputText border rounded-md p-1"
          id="name"
          type="text"
          placeholder="Name"
        ></input>{" "}
        <br />
        <input
          className="inputText border rounded-md p-1"
          id="symbol"
          type="text"
          placeholder="Symbol"
        ></input>{" "}
        <br />
        <input
          className="inputText border rounded-md p-1"
          id="image"
          type="text"
          placeholder="Image URL"
        ></input>{" "}
        <br />
        <input
          id="supply"
          className="inputText border rounded-md p-1"
          type="text"
          placeholder="Initial Supply"
        ></input>{" "}
        <br />
        <button
          onClick={createToken}
          className="bg-blue-400 rounded-md text-center p-1 text-white"
        >
          Create a token
        </button>
      </div>
    </div>
  );
};

export default HomePage;
