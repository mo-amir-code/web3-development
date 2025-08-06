const tokens = [
  {
    name: "Wrapped SOL",
    symbol: "SOL",
    mint: "So11111111111111111111111111111111111111112",
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    decimals: 9,
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
    decimals: 6,
  },
  {
    name: "USDT",
    symbol: "USDT",
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg",
    decimals: 6,
  },
  {
    name: "BONK",
    symbol: "BONK",
    mint: "6dhTynDkYsVM7cbF7TKfC9DWB636TcEM935fq7JzL2ES",
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6dhTynDkYsVM7cbF7TKfC9DWB636TcEM935fq7JzL2ES/logo.png",
    decimals: 9,
  },
  {
    name: "Wife",
    symbol: "WIF",
    mint: "Coq3LbB52jzCxk5W8SJTyK3SB83sYTKEjs2JmHaoSGxS",
    logoURI:
      "https://raw.githubusercontent.com/FullMoonMiningCo/logos/main/wif-logo.png",
    decimals: 9,
  },
  {
    name: "Raydium",
    symbol: "RAY",
    mint: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png",
    decimals: 6,
  },
];

const devnetTokens = [
  {
    name: "Wrapped SOL",
    symbol: "SOL",
    mint: "So11111111111111111111111111111111111111112",
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    decimals: 9,
  },
  {
    name: "Serum",
    symbol: "SRM",
    mint: "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt",
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt/logo.png",
    decimals: 6,
  },
  {
    name: "Aiko",
    symbol: "Aiko",
    mint: "DGGETjRbXeNyq2bpA7FLmWwqjFLtS8p5aYjzUwtAHtZd",
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7YBn43cTvko7mfZ9YV1iyAUfHNuMp6aAy4rX7wehXcbU/logo.png",
    decimals: 0,
  },
  {
    name: "VDC Coin",
    symbol: "VDC",
    mint: "zbLcPeHWQ7yQXT7fEYHeNBKGM3wdGhNYL9jryVpys5J",
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/zbLcPeHWQ7yQXT7fEYHeNBKGM3wdGhNYL9jryVpys5J/logo.png",
    decimals: 2,
  },
  {
    name: "Robin Coin",
    symbol: "RBN",
    mint: "5Ct5qBYm2u7qB14iQcmLwnx5nmC6GJGjZee39scBcrSR",
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5Ct5qBYm2u7qB14iQcmLwnx5nmC6GJGjZee39scBcrSR/logo.png",
    decimals: 9,
  },
  {
    name: "LGG Dev Fan Token",
    symbol: "LGGD",
    mint: "7Cab8z1Lz1bTC9bQNeY7VQoZw5a2YbZoxmvFSvPgcTEL",
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7Cab8z1Lz1bTC9bQNeY7VQoZw5a2YbZoxmvFSvPgcTEL/logo.png",
    decimals: 0,
  },
  {
    name: "XYZ Test",
    symbol: "XYZ",
    mint: "DEhAasscXF4kEGxFgJ3bq4PpVGp5wyUxMRvn6TzGVHaw",
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DEhAasscXF4kEGxFgJ3bq4PpVGp5wyUxMRvn6TzGVHaw/logo.png",
    decimals: 6,
  },
  {
    name: "SOL stake pool",
    symbol: "pSOL",
    mint: "2rg5syU3DSwwWs778FQ6yczDKhS14NM3vP4hqnkJ2jsM",
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2rg5syU3DSwwWs778FQ6yczDKhS14NM3vP4hqnkJ2jsM/logo.png",
    decimals: 9,
  },
  {
    name: "Step",
    symbol: "STEP",
    mint: "StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT",
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT/logo.png",
    decimals: 9,
  },
];

const alchemyConnections = {
  mainnet: "https://solana-mainnet.g.alchemy.com/v2/stil1hscfxZe1Dc3uzf1j",
  devnet: "https://solana-devnet.g.alchemy.com/v2/stil1hscfxZe1Dc3uzf1j",
};

export { tokens, alchemyConnections, devnetTokens };
