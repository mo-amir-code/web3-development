use {
    borsh::{BorshDeserialize, BorshSerialize},
    mpl_token_metadata::instruction as mpl_instruction,
    solana_program::{
        account_info::{AccountInfo, next_account_info},
        entrypoint::ProgramResult,
        msg,
        program::invoke,
        program_pack::Pack,
        rent::Rent,
        system_instruction,
        sysvar::Sysvar,
    },
    spl_token::{
        instruction as token_instruction, solana_program::program_pack::Pack, state::Mint,
    },
};

#[derive(BorshDeserialize, BorshSerialize, Debug)]
pub struct CreateTokenArgs {
    pub token_title: String,
    pub token_symbol: String,
    pub token_uri: String,
}

pub fn create_token(accounts: &[AccountInfo], args: CreateTokenArgs) -> ProgramResult {
    let account_iter = &mut accounts.iter();

    let mint_account = next_account_info(account_iter)?;
    let mint_authority = next_account_info(account_iter);
    let metadata_account = next_account_info(account_iter);
    let payer = next_account_info(account_iter);
    let rent = next_account_info(account_iter);
    let system_program = next_account_info(account_iter);
    let token_program = next_account_info(account_iter);
    let token_metadata_program = next_account_info(account_iter);

    msg!("Creating mint account....");
    msg!("Mint: {}", mint_account.key);

    invoke(
        &system_instruction::create_account(
            payer.key,
            mint_account.key,
            (Rent::get()?).minimum_balance(Mint::LEN),
            Mint::LEN as u64,
            token_program.key,
        ),
        &[
            mint_account.clone(),
            payer.clone(),
            system_program.clone(),
            token_program.clone(),
        ],
    );

    msg!("Initializing mint account...");
    msg!("Mint: {}", mint_account.key);

    invoke(
        &token_instruction::initialize_mint(
            token_program.key,
            mint_account.key,
            mint_authority.key,
            Some(mint_authority.key),
            9,
        ),
        &[
            mint_account.clone(),
            mint_authority.clone(),
            token_program.clone(),
            rent.clone(),
        ],
    );

    msg!("Creating metadata account...");
    msg!("Metadata account address: {}", metadata_account.key);

    invoke(
        &mpl_instruction::create_metadata_accounts_v3(
            *token_metadata_program.key,
            *metadata_account.key,
            *mint_account.key,
            *mint_authority.key,
            *payer.key,
            *mint_authority.key,
            args.token_title,
            args.token_symbol,
            args.token_uri,
            None,
            0,
            true,
            false,
            None,
            None,
            None,
        ),
        &[
            metadata_account.clone(),
            mint_account.clone(),
            mint_authority.clone(),
            payer.clone(),
            token_metadata_program.clone(),
            rent.clone(),
        ],
    )?;


    msg!("Token mint created successfully.");

    Ok(())
}
