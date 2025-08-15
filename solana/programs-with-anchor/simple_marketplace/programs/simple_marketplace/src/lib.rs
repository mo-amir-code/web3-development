use anchor_lang::prelude::*;

declare_id!("4Wdt8pySnfxHJakmAeraPEiBA9jhNQDTNzin5Msbwc3F");

pub mod constants;
pub mod states;

use crate::states::*;

#[program]
mod simple_marketplace {
    use super::*;

    pub fn create_user(ctx: Context<CreateUserContext>, name: String) -> Result<()> {
        let new_user = &mut ctx.accounts.user;

        new_user.user = ctx.accounts.authority.key();
        new_user.name = name;
        new_user.items_count = 0;

        Ok(())
    }

    pub fn add_item(
        ctx: Context<AddItemContext>,
        title: String,
        description: String,
        qty: u64,
    ) -> Result<()> {
        let new_item = &mut ctx.accounts.item;
        let user = &mut ctx.accounts.user;

        new_item.user = ctx.accounts.authority.key();
        new_item.title = title;
        new_item.description = description;
        new_item.qty = qty;
        new_item.sold = 0;

        user.items_count += 1;

        Ok(())
    }

}

#[derive(Accounts)]
pub struct CreateUserContext<'info> {
    #[account(
        init,  
        seeds = [authority.key().as_ref()],
        bump,
        payer = authority,
        space = UserAccount::LEN
    )]
    pub user: Account<'info, UserAccount>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddItemContext<'info> {
    #[account(
        mut,
        seeds = [authority.key().as_ref()],
        bump
    )]
    pub user: Account<'info, UserAccount>,

    #[account(
        init,
        seeds = [authority.key().as_ref(), user.items_count.to_le_bytes().as_ref()],
        bump,
        payer = authority,
        space = ItemAccount::LEN
    )]
    pub item: Account<'info, ItemAccount>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
