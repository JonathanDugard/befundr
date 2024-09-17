use anchor_lang::prelude::*;

pub mod instructions;
pub mod state;
pub mod constants;

use instructions::*;

declare_id!("29rtbJLEFXoCc6sTzp2jAHhXgrZTEb6EaMnUTDP14VFv");

#[program]
pub mod befundr {
    use super::*;

    pub fn create_user(ctx: Context<CreateUserProfile>, name: Option<String>, avatar_url: Option<String>, bio: Option<String>) -> Result<()> {
        instructions::create_user(ctx, name, avatar_url, bio)
    }
}

#[derive(Accounts)]
pub struct Initialize {}
