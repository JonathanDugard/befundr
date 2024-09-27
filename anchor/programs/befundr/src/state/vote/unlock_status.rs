use anchor_lang::prelude::*;

#[derive(Clone, InitSpace, AnchorSerialize, AnchorDeserialize)]
pub enum UnlockStatus {
    Approved,
    Rejected,
}
