use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{AccountInfo, next_account_info},
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
    entrypoint
};

#[derive(BorshDeserialize, BorshSerialize)]
struct Counter {
    count: u32,
}

#[derive(BorshDeserialize, BorshSerialize)]
enum CounterInstruction {
    Increament(u32),
    Decreament(u32),
}

entrypoint!(process_instruction);

pub fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let account = next_account_info(&mut accounts.iter())?;

    let mut account_data = Counter::try_from_slice(&account.data.borrow())?;

    match CounterInstruction::try_from_slice(instruction_data)? {
        CounterInstruction::Increament(amount) => {
            account_data.count += amount;
        }
        CounterInstruction::Decreament(amount) => {
            account_data.count -= amount;
        }
    }

    account_data.serialize(&mut *account.data.borrow_mut())?;

    msg!("Account updated");

    Ok(())
}
