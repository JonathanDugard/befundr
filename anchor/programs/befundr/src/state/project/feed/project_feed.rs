use super::FeedItem;
use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct ProjectFeed {
    pub project_id: Pubkey,

    #[max_len(100)]
    pub feed: Vec<FeedItem>,
}

impl ProjectFeed {}
