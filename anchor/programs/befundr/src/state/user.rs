use crate::constants::user::*;
use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct User {
    pub owner: Pubkey,
    #[max_len(MAX_NAME_LENGTH)]
    pub name: Option<String>,
    #[max_len(MAX_AVATAR_URL_LENGTH)]
    pub avatar_url: Option<String>,
    #[max_len(MAX_BIO_LENGTH)]
    pub bio: Option<String>,
    pub created_project_counter: u16,
}

impl Default for User {
    fn default() -> Self {
        Self {
            owner: Pubkey::default(),
            name: None,
            avatar_url: None,
            bio: None,
            created_project_counter: 0,
        }
    }
}
