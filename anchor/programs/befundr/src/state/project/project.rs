use anchor_lang::prelude::*;

use super::{project_feed::ProjectFeed, Reward};

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

    #[max_len(10)]
    pub rewards: Vec<Reward>,

    pub feed: Pubkey,
}

impl Project {}

#[derive(Clone, InitSpace, AnchorSerialize, AnchorDeserialize)]
pub enum Status {
    Draft,
    Fundraising,
    Realising,
    Completed,
    Abandoned,
    Suspended,
}
