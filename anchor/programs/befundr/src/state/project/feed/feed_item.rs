use anchor_lang::prelude::*;

use super::FeedItemCategory;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, InitSpace)]
pub struct FeedItem {
    pub author: Pubkey,

    #[max_len(50)]
    pub title: String,

    pub timestamp: i64,

    #[max_len(500)]
    pub content: String,
    pub category: FeedItemCategory,
}

impl FeedItem {}
