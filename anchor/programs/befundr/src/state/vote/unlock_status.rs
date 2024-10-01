use anchor_lang::prelude::*;

#[derive(Clone, InitSpace, AnchorSerialize, AnchorDeserialize, PartialEq)]
pub enum UnlockStatus {
    Approved,
    Rejected,
}
