use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct SaleTransaction {
    pub seller: Pubkey,
    pub contribution: Pubkey,

    pub contribution_amount: u64,
    pub selling_price: u64,
    pub creation_timestamp: i64,
}

impl SaleTransaction {}
