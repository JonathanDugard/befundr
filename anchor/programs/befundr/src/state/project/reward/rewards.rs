use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Rewards {
    pub project: Pubkey,
    pub rewards_counter: u16,
}

impl Rewards {}
