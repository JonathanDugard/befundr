use anchor_lang::prelude::*;
use crate::constants::user::*;

#[account]
#[derive(InitSpace)]
pub struct UserProfile {
    pub wallet_pubkey: Pubkey,
    #[max_len(MAX_NAME_LENGTH)]
    pub name: Option<String>,
    #[max_len(MAX_AVATAR_URL_LENGTH)]
    pub avatar_url: Option<String>,
    #[max_len(MAX_BIO_LENGTH)]
    pub bio: Option<String>,
    pub created_project_counter: u16,
}

impl Default for UserProfile {
    fn default() -> Self {
        Self {
            wallet_pubkey: Pubkey::default(),
            name: None,
            avatar_url: None,
            bio: None,
            created_project_counter: 0
        }
    }
}