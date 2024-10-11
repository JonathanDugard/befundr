use anchor_lang::prelude::*;

use crate::{
    constants::user_contributions::MAX_CONTRIBUTIONS_NUMBER, errors::UserContributionsError,
};

#[account]
#[derive(InitSpace)]
pub struct UserContributions {
    #[max_len(MAX_CONTRIBUTIONS_NUMBER)]
    pub contributions: Vec<Pubkey>,
}

impl UserContributions {
    pub fn remove_contribution(&mut self, pubkey: Pubkey) -> Result<()> {
        if let Some(index) = self.contributions.iter().position(|&x| x == pubkey) {
            self.contributions.remove(index);
            Ok(())
        } else {
            Err(UserContributionsError::ContributionNotFound.into())
        }
    }
}
