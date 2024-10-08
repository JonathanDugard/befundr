use anchor_lang::prelude::*;

use crate::constants::project::{
    MAX_DESCRIPTION_LENGTH, MAX_NAME_LENGTH, MAX_REWARDS_NUMBER, MAX_URL_LENGTH,
};

use super::{ProjectCategory, Reward};

#[account]
#[derive(InitSpace)]
pub struct Project {
    pub owner: Pubkey,
    pub user: Pubkey,

    #[max_len(MAX_NAME_LENGTH)]
    pub name: String,

    #[max_len(MAX_URL_LENGTH)]
    pub image_url: String,

    #[max_len(MAX_DESCRIPTION_LENGTH)]
    pub description: String,

    #[max_len(MAX_URL_LENGTH)]
    pub x_account_url: String,

    pub category: ProjectCategory,

    pub goal_amount: u64,
    pub raised_amount: u64,
    pub created_time: i64,
    pub end_time: i64,
    pub status: ProjectStatus,
    pub contribution_counter: u16,

    #[max_len(MAX_REWARDS_NUMBER)]
    pub rewards: Vec<Reward>,

    pub feed: Pubkey,
    pub safety_deposit: u64,
}

impl Project {}

#[derive(Clone, InitSpace, AnchorSerialize, AnchorDeserialize, PartialEq, Eq)]
pub enum ProjectStatus {
    Draft,
    Fundraising,
    Realising,
    Completed,
    Abandoned,
    Suspended,
}
