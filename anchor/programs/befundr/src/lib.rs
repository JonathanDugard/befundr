use anchor_lang::prelude::*;

pub mod constants;
pub mod instructions;
pub mod state;

use instructions::*;

declare_id!("29rtbJLEFXoCc6sTzp2jAHhXgrZTEb6EaMnUTDP14VFv");

#[program]
pub mod befundr {
    use super::*;

    pub fn create_user(
        ctx: Context<CreateUser>,
        name: Option<String>,
        avatar_url: Option<String>,
        bio: Option<String>,
    ) -> Result<()> {
        instructions::create_user(ctx, name, avatar_url, bio)
    }

    pub fn update_user(
        ctx: Context<UpdateUser>,
        name: Option<String>,
        avatar_url: Option<String>,
        bio: Option<String>,
    ) -> Result<()> {
        instructions::update_user(ctx, name, avatar_url, bio)
    }
}

#[derive(Accounts)]
pub struct Initialize {}
