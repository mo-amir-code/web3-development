// Auth

type AuthUserType = {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber?: number;
  photoURL?: string;
};

type AuthResponseType = {
  user: AuthUserType;
};

type TokenType = "SolanaNative" | "SPL";

type TokenMetadataType = {
  name: string | null;
  symbol: string | null;
  amount: string;
  decimals: number;
  logoUri: string | null;
  type: TokenType;
  programId?: string;
  mintAddress?: string;
  price?: number;
};

export type { AuthUserType, AuthResponseType, TokenType, TokenMetadataType };
