use anchor_lang::prelude::*;

use crate::constants::*;

#[account]
#[derive(Debug)]
pub struct UserAccount {
    pub user: Pubkey,
    pub name: String,
    pub items_count: u64,
}

impl UserAccount {
    pub const LEN: usize =
        PADDING_LENGTH + DESCRIMINATOR_LENGTH + PUB_KEY_LENGTH + NAME_LENGTH + ITEMS_COUNT_LENGTH;
}

#[account]
#[derive(Debug)]
pub struct ItemAccount {
    pub user: Pubkey,
    pub title: String,
    pub description: String,
    pub sold: u64,
    pub qty: u64,
}

impl ItemAccount {
    pub const LEN: usize = PADDING_LENGTH
        + DESCRIMINATOR_LENGTH
        + QTY_LENGTH
        + SOLD_LENGTH
        + TITLE_LENGTH
        + PUB_KEY_LENGTH
        + DESCRIPTION_LENGTH;
}
