use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Contribution {
    //Should contain Signer Pubkey
    pub initial_owner: Pubkey, // User PDA pubkey
    pub current_owner: Pubkey, // User PDA pubkey
    pub amount: u64,
    pub reward_id: u64,
    pub timestamp: i64,
    pub is_for_sale: bool,
    pub selling_price: Option<u64>,
}
