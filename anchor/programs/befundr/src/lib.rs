use anchor_lang::prelude::*;

pub mod constants;
pub mod instructions;
pub mod state;

use instructions::*;
use state::Reward;

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

    pub fn create_project(
        ctx: Context<CreateProject>,
        name: String,
        image_url: String,
        project_description: String,
        goal_amount: u64,
        end_time: i64,
        rewards: Vec<Reward>,
    ) -> Result<()> {
        instructions::create_project(
            ctx,
            name,
            image_url,
            project_description,
            goal_amount,
            end_time,
            rewards,
        )
    }
}

#[derive(Accounts)]
pub struct Initialize {}
