use anchor_lang::prelude::*;

use crate::constants::unlock_request::MAX_REQUEST_NUMBER;

#[account]
#[derive(InitSpace)]
pub struct UnlockRequests {
    pub project: Pubkey,
    pub request_counter: u64,

    #[max_len(MAX_REQUEST_NUMBER)]
    pub requests: Vec<Pubkey>,
}

impl UnlockRequests {}
