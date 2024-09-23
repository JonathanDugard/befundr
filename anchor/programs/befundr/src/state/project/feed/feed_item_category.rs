use anchor_lang::prelude::*;

#[derive(Clone, InitSpace, AnchorSerialize, AnchorDeserialize)]
pub enum FeedItemCategory {
    Information,
    FundsUnlock,
    Milestone,
    Vote,
}
