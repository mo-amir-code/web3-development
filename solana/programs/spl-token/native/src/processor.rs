use {
    borsh::{BorshDeserialize, BorshSerialize},
    solana_program::{account_info::AccountInfo, entrypoint::ProgramResult, pubkey::Pubkey},
};

use crate::instructions::{
    create::{CreateTokenArgs, create_token},
    mint::{MintArgs, mint_to},
};

#[derive(BorshDeserialize, BorshSerialize, Debug)]
enum SplMinterInstruction {
    Create(CreateTokenArgs),
    Mint(MintArgs),
}

pub fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    instrcution_data: &[u8],
) -> ProgramResult {
    let instruction = SplMinterInstruction::try_from_slice(instrcution_data)?;

    match instrcution {
        SplMinterInstruction::Create(args) => create_token(accounts, args),
        SplMinterInstruction::Mint(args) => mint_to(accounts, args),
    }
}
