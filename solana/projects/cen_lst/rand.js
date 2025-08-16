const res = [
  {
    blockTime: 1755289275,
    indexWithinBlock: 16,
    meta: {
      err: null,
      fee: 79984,
      innerInstructions: [],
      loadedAddresses: { readonly: [], writable: [] },
      logMessages: [
        "Program ComputeBudget111111111111111111111111111111 invoke [1]",
        "Program ComputeBudget111111111111111111111111111111 success",
        "Program ComputeBudget111111111111111111111111111111 invoke [1]",
        "Program ComputeBudget111111111111111111111111111111 success",
        "Program TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb invoke [1]",
        "Program log: Instruction: TransferChecked",
        "Program TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb consumed 2633 of 3178 compute units",
        "Program TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb success",
      ],
      postBalances: [1755359559, 2074080, 2074080, 3271200, 1, 1141440],
      postTokenBalances: [
        {
          accountIndex: 1,
          mint: "7U1hzMCuar5PjgGVGw58nswow5f4p9D4NTD1JUF2ch1P",
          owner: "4RjT7PuxrCcq8ayBETpeJi6UXCPZSkRZdHg5Eu6fpFYT",
          programId: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
          uiTokenAmount: {
            amount: "5022121200000",
            decimals: 9,
            uiAmount: 5022.121,
            uiAmountString: "5022.1212",
          },
        },
        {
          accountIndex: 2,
          mint: "7U1hzMCuar5PjgGVGw58nswow5f4p9D4NTD1JUF2ch1P",
          owner: "4ExCkT4h9rimmjoaaN8qp4AUzRkRChKPhJBx5stfeQAv",
          programId: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
          uiTokenAmount: {
            amount: "977878770517",
            decimals: 9,
            uiAmount: 977.8788,
            uiAmountString: "977.878770517",
          },
        },
      ],
      preBalances: [1755439543, 2074080, 2074080, 3271200, 1, 1141440],
      preTokenBalances: [
        {
          accountIndex: 1,
          mint: "7U1hzMCuar5PjgGVGw58nswow5f4p9D4NTD1JUF2ch1P",
          owner: "4RjT7PuxrCcq8ayBETpeJi6UXCPZSkRZdHg5Eu6fpFYT",
          programId: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
          uiTokenAmount: {
            amount: "5010000000000",
            decimals: 9,
            uiAmount: 5010,
            uiAmountString: "5010",
          },
        },
        {
          accountIndex: 2,
          mint: "7U1hzMCuar5PjgGVGw58nswow5f4p9D4NTD1JUF2ch1P",
          owner: "4ExCkT4h9rimmjoaaN8qp4AUzRkRChKPhJBx5stfeQAv",
          programId: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
          uiTokenAmount: {
            amount: "989999970517",
            decimals: 9,
            uiAmount: 990,
            uiAmountString: "989.999970517",
          },
        },
      ],
      rewards: [],
    },
    slot: 401379009,
    transaction: {
      message: {
        accountKeys: [
          "4ExCkT4h9rimmjoaaN8qp4AUzRkRChKPhJBx5stfeQAv",
          "4mJoP1YuniM3QuwSigKp2c1Lz6ZtZV56qJHp3MDG9U3n",
          "J3qvCLThrAHPgzyBm8yZGXwH9znGF1pWw1qXDLrpj6Ts",
          "7U1hzMCuar5PjgGVGw58nswow5f4p9D4NTD1JUF2ch1P",
          "ComputeBudget111111111111111111111111111111",
          "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
        ],
        addressTableLookups: null,
        header: {
          numReadonlySignedAccounts: 0,
          numReadonlyUnsignedAccounts: 3,
          numRequiredSignatures: 1,
        },
        instructions: [
          { accounts: [], data: "3iZHg85a8hx3", programIdIndex: 4 },
          { accounts: [], data: "HvXApP", programIdIndex: 4 },
          {
            accounts: [2, 3, 1, 0, 0],
            data: "hk4YCBUWdNrWk",
            programIdIndex: 5,
          },
        ],
        recentBlockhash: "DD4WCHMumUxbkwo6hoUKwneNjsAWFy2ZGPqfTR9dovCU",
      },
      signatures: [
        "3HkvvNo5KSNxQfyeQs3rWqkoBm9k6xTt3cNRwKgj2E95BFphVHjozVabsPDAaZzqyEnCt5nxxzGjbvcdEUQfSJy9",
      ],
    },
    version: "legacy",
  },
];

const preBalance = res[0].meta.preTokenBalances;
const postBalance = res[0].meta.postTokenBalances;

// console.log(preBalance)

const amount =
  preBalance[1].uiTokenAmount.uiAmount - postBalance[1].uiTokenAmount.uiAmount;

console.log("Amount is: ", amount);
