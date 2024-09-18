use anchor_lang::prelude::*;

use super::Reward;

#[account]
#[derive(InitSpace)]
pub struct Project {
    pub owner: Pubkey,
    pub user: Pubkey,

    #[max_len(64)]
    pub name: String,

    #[max_len(128)]
    pub image_url: String,

    #[max_len(3000)]
    pub project_description: String,

    pub goal_amount: u64,
    pub raised_amount: u64,
    pub created_time: i64,
    pub end_time: i64,
    pub status: Status,
    pub contribution_counter: u16,

    #[max_len(50, 324)] //50 rewards of 324 bytes each
    pub rewards: Vec<Reward>,
}

impl Project {}

#[derive(Clone, InitSpace, AnchorSerialize, AnchorDeserialize, PartialEq, Eq)]
pub enum Status {
    Draft = 0,
    Fundraising = 1,
    Realising = 2,
    Completed = 3,
    Abandoned = 4,
    Suspended = 5,
}
