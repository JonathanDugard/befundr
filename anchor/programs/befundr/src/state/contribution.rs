use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Contribution {
    //Should contain Signer Pubkey
    pub initial_owner: Pubkey, // User PDA pubkey
    pub current_owner: Pubkey, // User PDA pubkey
    pub project: Pubkey,
    pub amount: u64,
    pub reward_id: Option<u64>,
    pub creation_timestamp: i64,
    pub is_for_sale: bool,
    pub selling_price: Option<u64>,
    pub status: ContributionStatus,
}

#[derive(Clone, InitSpace, AnchorSerialize, AnchorDeserialize, PartialEq, Eq)]
pub enum ContributionStatus {
    Active,
    Cancelled,
}
