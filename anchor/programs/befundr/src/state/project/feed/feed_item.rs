use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, InitSpace)]
pub struct FeedItem {
    pub author: Pubkey,
    pub timestamp: i64,

    #[max_len(500)]
    pub content: String,
}

impl FeedItem {}
