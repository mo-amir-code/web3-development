type TransactionModeType = "mail" | "address";

type SendTransactionType = {
  tokenMintAddress: string;
  toPubKey: string | null;
  amount: number;
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
