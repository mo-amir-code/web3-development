import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  createAssociatedTokenAccountInstruction,
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  createMintToInstruction,
  ExtensionType,
  getAssociatedTokenAddressSync,
  getMintLen,
  LENGTH_SIZE,
  TOKEN_2022_PROGRAM_ID,
  TYPE_SIZE,
} from "@solana/spl-token";
import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";
import toast from "react-hot-toast";
import { useState } from "react";

const CreateToken = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const wallet = useWallet();
  const { connection } = useConnection();

  const handleMintToken = async () => {
    if (!wallet.publicKey) {
      console.error("Wallet is not connected.....");
      return;
    }

    const tokenName =
      (document.getElementById("name") as HTMLInputElement).value || "";
    const tokenSymbol =
      (document.getElementById("symbol") as HTMLInputElement).value || "";
    const tokenDecimal = parseInt(
      (document.getElementById("decimal") as HTMLInputElement).value || "0"
    );
    const metadataUri =
      (document.getElementById("metadata") as HTMLInputElement).value || "";

    if (
      tokenName.length == 0 ||
      tokenSymbol.length == 0 ||
      tokenDecimal == 0 ||
      metadataUri.length == 0
    ) {
      toast.error("All token fields are required");
      return;
    }

    setIsLoading(true);
    const tId = toast.loading("Token is creating....");

    const mintKeyPair = Keypair.generate();

    const metadata = {
      mint: mintKeyPair.publicKey,
      name: tokenName,
      symbol: tokenSymbol,
      uri: metadataUri,
      additionalMetadata: [],
    };

    try {
      const mintLen = getMintLen([ExtensionType.MetadataPointer]);
      const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

      // const lamports = await getMinimumBalanceForRentExemptMint(connection);
      const lamports = await connection.getMinimumBalanceForRentExemption(
        mintLen + metadataLen
      );

      const txn = new Transaction();
      txn.add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          newAccountPubkey: mintKeyPair.publicKey,
          space: mintLen,
          lamports,
          programId: TOKEN_2022_PROGRAM_ID,
        }),
        createInitializeMetadataPointerInstruction(
          mintKeyPair.publicKey,
          wallet.publicKey,
          mintKeyPair.publicKey,
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeMintInstruction(
          mintKeyPair.publicKey,
          tokenDecimal,
          wallet.publicKey,
          wallet.publicKey,
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeInstruction({
          programId: TOKEN_2022_PROGRAM_ID,
          mint: mintKeyPair.publicKey,
          metadata: mintKeyPair.publicKey,
          name: metadata.name,
          symbol: metadata.symbol,
          uri: metadata.uri,
          mintAuthority: wallet.publicKey,
          updateAuthority: wallet.publicKey,
        })
      );

      txn.feePayer = wallet.publicKey;
      txn.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      txn.partialSign(mintKeyPair);

      await wallet.sendTransaction(txn, connection);

      console.log(
        "New Token created successfully! Token Keypair: " +
          mintKeyPair.publicKey.toBase58()
      );

      handleMintTokens(mintKeyPair);
      toast.success("Token created successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while creating token!");
    } finally {
      setIsLoading(false);
      toast.dismiss(tId);
    }
  };

  const handleMintTokens = async (mintKeyPair: Keypair) => {
    if (!wallet.publicKey) return;

    const tokenSupply = parseInt(
      (document.getElementById("supply") as HTMLInputElement).value || "0"
    );

    console.log("Token Supply: ", tokenSupply);

    const associatedToken = getAssociatedTokenAddressSync(
      mintKeyPair.publicKey,
      wallet.publicKey,
      false,
      TOKEN_2022_PROGRAM_ID
    );

    console.log("Associated Token: " + associatedToken.toBase58());

    const txn = new Transaction();
    txn.add(
      createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        associatedToken,
        wallet.publicKey,
        mintKeyPair.publicKey,
        TOKEN_2022_PROGRAM_ID
      )
    );

    await wallet.sendTransaction(txn, connection);

    const txt2 = new Transaction();
    txt2.add(
      createMintToInstruction(
        mintKeyPair.publicKey,
        associatedToken,
        wallet.publicKey,
        tokenSupply * LAMPORTS_PER_SOL,
        [],
        TOKEN_2022_PROGRAM_ID
      )
    );

    await wallet.sendTransaction(txt2, connection);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Token</CardTitle>
        <CardDescription>
          Easily create your own SPL (Solana Program Library) token on the
          Solana blockchain using this simple and secure form.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Input
              type="text"
              placeholder="Token Name e.g. Shiba Inu"
              id="name"
            />
            <Input
              type="text"
              placeholder="Token Symbol e.g. SHIB"
              id="symbol"
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Input
              type="text"
              placeholder="Token Decimal e.g. 9"
              id="decimal"
              defaultValue={"9"}
            />
            <Input
              type="text"
              placeholder="Token Supply e.g. 100000000"
              id="supply"
            />
          </div>
          <Input type="text" placeholder="Metadata URL" id="metadata" />

          <Button disabled={isLoading} onClick={() => handleMintToken()}>
            Deploy Token
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateToken;
