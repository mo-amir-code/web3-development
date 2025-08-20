interface ServerResponseType<T> {
  data: T;
  message: string;
  success: boolean;
}

interface AxiosResponseType<T> {
  data: ServerResponseType<T>;
}

type SendTransactionResponseDataType = {
  signature: string;
};

type TransactionStatusType = "PROCESSING" | "SUCCESSED" | "FAILED"; // Adjust based on your actual enum values

type TransactionResponseType = {
  id: number;
  signature: string;
  status: TransactionStatusType;
  fromPubKey: string;
  toPubKey: string;
  tokenMint: string;
  amount: bigint;
  createdAt: Date;
  updatedAt: Date;
};

export type {
  ServerResponseType,
  AxiosResponseType,
  SendTransactionResponseDataType,
  TransactionResponseType,
};
