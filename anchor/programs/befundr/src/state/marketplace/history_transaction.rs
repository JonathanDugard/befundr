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

impl HistoryTransaction {
    pub fn new(
        seller: Pubkey,
        buyer: Pubkey,
        contribution: Pubkey,
        selling_price: u64,
        creation_timestamp: i64,
        sale_timestamp: i64,
    ) -> Self {
        HistoryTransaction {
            seller,
            buyer,
            contribution,
            selling_price,
            creation_timestamp,
            sale_timestamp,
        }
    }
}
