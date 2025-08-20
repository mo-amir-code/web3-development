type TransactionModeType = "mail" | "address";

type SendTransactionTYpe = {
  tokenMintAddress: string;
  amount: bigint;
  mode: TransactionModeType;
  programId: string | null;
} & ({ toPubKey: string } | { email: string });


export type {
    TransactionModeType,
    SendTransactionTYpe
}
