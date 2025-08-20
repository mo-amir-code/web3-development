type TransactionModeType = "mail" | "address";

type SendTransactionType = {
  tokenMintAddress: string;
  toPubKey: string | null;
  amount: bigint | string;
  programId: string | null;
};

type SendTransactionBodyType = {
  email?: string;
  mode: TransactionModeType;
} & SendTransactionType;

export type {
  SendTransactionBodyType,
  TransactionModeType,
  SendTransactionType,
};
