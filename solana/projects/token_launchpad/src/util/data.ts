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
    name: "post it everywhere",
    symbol: "postcoin",
    mint: "3uZxxnYnVrZeAADJbafqDJLXF3ZY9bc5PrAhBVz5pump",
    logoURI:
      "https://ipfs.io/ipfs/QmR5UJ7oxCiEQRLGm6ToW3mDU6JmgZv4djjJFKypThMfN2",
    decimals: 6,
  },
  {
    name: "Nettensor",
    symbol: "NETTENSOR",
    mint: "qsbGrw51m6UUywZBb9QBZeeRk3nYNh43RKicPZKbonk",
    logoURI:
      "https://ipfs.io/ipfs/bafkreifox6pzllhntf2iil35m4k4d6fciqqotxerylw5o4ikfocoxrgoay",
    decimals: 6,
  },
  {
    name: "GOOD DOG",
    symbol: "GOODDOG",
    mint: "6hMrpXsZMMDgYcnQGpVe45xtjaQhYkg3qm9ifGd5pump",
    logoURI:
      "https://ipfs.io/ipfs/Qmd13hEejezs1Drm9xL66K86fvQCwbjtB3wHwbA5kTuNDT",
    decimals: 6,
  },
  {
    name: "BIB",
    symbol: "BIB",
    mint: "5C6pkhd4UQz9tty3goFpLEX3AkNhn2hATZmKDQ2fpump",
    logoURI: undefined,
    decimals: 6,
  },
  {
    name: "Concentrate Coin",
    symbol: "Cow Coin",
    mint: "6kvDKDXfwrzSycpXaj7GFm8nxQvUNzWroKnfU3M8pump",
    logoURI:
      "https://ipfs.io/ipfs/QmW6R4yZdTTX6xhDZmFkW7694bBpaQtf2W2M3M9wrjHatQ",
    decimals: 6,
  },
  {
    name: "Dobby",
    symbol: "DOBBY",
    mint: "C3mRKJbvLx7gXuzU9ggt9ioHnXSPhux5wpsqMFDTpump",
    logoURI:
      "https://ipfs.io/ipfs/Qme1JDNybW2wrjaw7KkN5i4tS9dLocVwCvkbZ9LdiVskKB",
    decimals: 6,
  },
  {
    name: "GTA VI needs verification",
    symbol: "G6NV",
    mint: "3KqXdEsZqAXrokfytzCEdxWfru9EtU17DJVqFmFbpump",
    logoURI:
      "https://ipfs.io/ipfs/QmSW9cQ8eH7gDFMfAauxW838aBSGggc6nRvdc9yBaVxN1z",
    decimals: 6,
  },
  {
    name: "george",
    symbol: "george",
    mint: "7NyfSDYkYfvUPFjXN6STW83BYmXjZhPnNjkVYSLNpump",
    logoURI:
      "https://ipfs.io/ipfs/bafkreiaefeebowazcv2qkz6p2uspdbxf3ibhqk4o4y6vt43j6wduhgpiui",
    decimals: 6,
  },
  {
    name: "Tom the magic lizard",
    symbol: "TOM",
    mint: "DDL6MetSw3ppkrA6mGDkTD7WMWUP7wtcE7XkpEakpump",
    logoURI:
      "https://ipfs.io/ipfs/bafkreic3unglq7j7cfbo74x5miyaesoevlt3fugbfdkuqwjuc5v7f5adbm",
    decimals: 6,
  },
  {
    name: "NISCA Labs",
    symbol: "NISCA",
    mint: "9kRz2vKeC51793oYqQbtD4ysd63MyReR7472NZ7aBAGS",
    logoURI:
      "https://ipfs.io/ipfs/QmTh7GrvZCWAEJqnv3bEy6Am238kjfgexQLxsikf94dyXb",
    decimals: 9,
  },
];

const alchemyConnections = {
  mainnet: "https://solana-mainnet.g.alchemy.com/v2/stil1hscfxZe1Dc3uzf1j",
  devnet: "https://solana-devnet.g.alchemy.com/v2/k85i4V7L1vMsJVHCmtJEw",
};

export { tokens, alchemyConnections, devnetTokens };
