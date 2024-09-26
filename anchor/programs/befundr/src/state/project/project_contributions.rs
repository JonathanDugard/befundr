use anchor_lang::prelude::*;

use crate::constants::project_contributions::MAX_CONTRIBUTIONS_NUMBER;

#[account]
#[derive(InitSpace)]
pub struct ProjectContributions {
    #[max_len(MAX_CONTRIBUTIONS_NUMBER)]
    pub contributions: Vec<Pubkey>,
}

impl ProjectContributions {}
