use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, InitSpace)]
pub struct Rewards {
    pub project: Pubkey,
    pub rewards_counter: u16,
}

impl Rewards {}
