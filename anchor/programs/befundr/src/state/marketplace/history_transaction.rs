use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct HistoryTransaction {
    pub seller: Pubkey,
    pub buyer: Pubkey,
    pub contribution: Pubkey,
    pub selling_price: u64,
    pub creation_timestamp: i64,
    pub sale_timestamp: i64,
}

impl HistoryTransaction {}
